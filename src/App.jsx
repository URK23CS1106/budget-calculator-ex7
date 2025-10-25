import React from 'react';
import BudgetCalculator from './components/BudgetCalculator';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <h1>Budget Calculator</h1>
          <p>Manage your monthly income and expenses effectively</p>
        </header>
        <BudgetCalculator />
      </div>
    </div>
  );
}

export default App;