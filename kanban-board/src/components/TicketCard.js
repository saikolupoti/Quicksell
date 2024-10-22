import React from 'react';
import './TicketCard.css'; // Ensure this file contains the updated styles

const TicketCard = ({ ticket, user }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <span className="ticket-priority">Priority {ticket.priority}</span>
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="ticket-meta">
        <span className="ticket-tag">{ticket.tag}</span>
      </div>
      <div className="ticket-details">
        <div className="ticket-user">
          <div className="ticket-user-avatar">
            {user.name.charAt(0)} {/* Using first letter of user's name as avatar */}
          </div>
          <div className="ticket-user-name">{user.name}</div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
