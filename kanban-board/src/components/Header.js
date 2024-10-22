import React from 'react';
import './Header.css';

const Header = ({ onGroupingChange, onSortingChange }) => {
  return (
    <header className="header">
      {/* Dropdown to change grouping */}
      <div className="grouping-dropdown">
        <label>Group By:</label>
        <select onChange={(e) => onGroupingChange(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {/* Dropdown to change sorting */}
      <div className="sorting-dropdown">
        <label>Sort By:</label>
        <select onChange={(e) => onSortingChange(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
