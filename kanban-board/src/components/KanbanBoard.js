import React, { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import "./KanbanBoard.css";

const KanbanBoard = ({ grouping, sorting }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]); // Store users
  const [loading, setLoading] = useState(true);

  // Fetch tickets and users from API on mount
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data); // Log the response data to check its structure

        // Check if the response contains both tickets and users
        if (
          data &&
          Array.isArray(data.tickets) &&
          Array.isArray(data.users)
        ) {
          setTickets(data.tickets); // Set tickets
          setUsers(data.users); // Set users
        } else {
          console.error("Expected an array but received:", data);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Custom priority sorting order
  const priorityOrder = ['Urgent', 'High', 'Medium', 'Low', 'No Priority'];

  // Helper function to map userId to user name
  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  // Function to group tickets by any field (status, userId, priority)
  const groupByField = (tickets, field, mapFunc) => {
    return tickets.reduce((acc, ticket) => {
      const key = mapFunc(ticket[field]);
      acc[key] = acc[key] || [];
      acc[key].push(ticket);
      return acc;
    }, {});
  };

  // Function to group tickets based on the selected grouping option
  const groupTickets = (tickets) => {
    switch (grouping) {
      case "status":
        return groupByField(tickets, "status", (status) => status || "Unspecified");
      case "user":
        return groupByField(tickets, "userId", getUserName); // Group by user name
      case "priority":
        return groupByField(tickets, "priority", getPriority); // Group by priority name
      default:
        return {};
    }
  };

  // Example mapFunction for priority
  const getPriority = (priority) => {
    switch (priority) {
      case 0:
        return 'Urgent';
      case 1:
        return 'High';
      case 2:
        return 'Medium';
      case 3:
        return 'Low';
      case 4:
        return 'No Priority';  // For undefined or other numbers
      default:
        return 'No Priority';  // For undefined or other numbers
    }
  };

  // Sort tickets by the selected sorting option
  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sorting === "priority") {
        return b.priority - a.priority; // Sort by descending priority
      } else if (sorting === "title") {
        return a.title.localeCompare(b.title); // Sort by ascending title
      }
      return 0; // Default case to keep order
    });
  };

  // Function to sort group keys by their priority order
  const sortGroupKeysByPriority = (keys) => {
    return keys.sort((a, b) => {
      const priorityA = priorityOrder.indexOf(a);
      const priorityB = priorityOrder.indexOf(b);
      return priorityA - priorityB;
    });
  };

  const renderGroupedTickets = (groupedTickets) => {
    const sortedGroupKeys = sortGroupKeysByPriority(Object.keys(groupedTickets));

    return (
      <div className="kanban-board">
        {sortedGroupKeys.map((groupKey) => (
          <div className="kanban-column" key={groupKey}>
            <h2>{groupKey}</h2>
            {sortTickets(groupedTickets[groupKey]).map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} user={getUserById(ticket.userId)} />
            ))}
          </div>
        ))}
      </div>
    );
  };

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId) || { name: "Unknown" };
  };

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  const groupedTickets = groupTickets(tickets);

  return (
    <>
      {Object.keys(groupedTickets).length === 0 ? (
        <p>No tickets available</p>
      ) : (
        renderGroupedTickets(groupedTickets)
      )}
    </>
  );
};

export default KanbanBoard;
