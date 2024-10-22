import React, { useState } from 'react';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import './App.css'; // Optionally import some global styles

const App = () => {
  const [grouping, setGrouping] = useState('status'); // Default group by status
  const [sorting, setSorting] = useState('priority'); // Default sort by priority

  // Method to handle grouping change
  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
  };

  // Method to handle sorting change
  const handleSortingChange = (newSorting) => {
    setSorting(newSorting);
  };

  return (
    <div className="app-container">
      <Header
        onGroupingChange={handleGroupingChange}
        onSortingChange={handleSortingChange}
      />
      <KanbanBoard grouping={grouping} sorting={sorting} />
    </div>
  );
};

export default App;
