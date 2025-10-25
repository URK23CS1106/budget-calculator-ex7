import React, { useState } from 'react';
import './BudgetCalculator.css';

const BudgetCalculator = () => {
  const [formData, setFormData] = useState({
    income: '',
    rent: '',
    food: '',
    transport: '',
    others: ''
  });
  
  const [balance, setBalance] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateInputs = () => {
    const { income, rent, food, transport, others } = formData;
    
    // Check if any field is empty
    if (!income || !rent || !food || !transport || !others) {
      alert('All fields are required!');
      return false;
    }
    
    // Convert to numbers and check if positive
    const incomeNum = parseFloat(income);
    const rentNum = parseFloat(rent);
    const foodNum = parseFloat(food);
    const transportNum = parseFloat(transport);
    const othersNum = parseFloat(others);
    
    if (incomeNum <= 0 || rentNum <= 0 || foodNum <= 0 || transportNum <= 0 || othersNum <= 0) {
      alert('All values must be positive numbers!');
      return false;
    }
    
    // Check if they are valid numbers
    if (isNaN(incomeNum) || isNaN(rentNum) || isNaN(foodNum) || isNaN(transportNum) || isNaN(othersNum)) {
      alert('Please enter valid numbers in all fields!');
      return false;
    }
    
    return true;
  };

  const calculateBalance = () => {
    if (!validateInputs()) return;
    
    const { income, rent, food, transport, others } = formData;
    const totalExpenses = parseFloat(rent) + parseFloat(food) + parseFloat(transport) + parseFloat(others);
    const remainingBalance = parseFloat(income) - totalExpenses;
    
    setBalance(remainingBalance);
    setIsCalculated(true);
  };

  const getBalanceMessage = () => {
    if (balance === null) return '';
    
    if (balance < 0) {
      return "You are overspending! Consider reviewing your expenses.";
    } else {
      return "Good job managing your expenses!";
    }
  };

  const getBalanceClass = () => {
    if (balance === null) return '';
    
    if (balance < 0) {
      return 'balance-negative';
    } else {
      return 'balance-positive';
    }
  };

  const resetCalculator = () => {
    setFormData({
      income: '',
      rent: '',
      food: '',
      transport: '',
      others: ''
    });
    setBalance(null);
    setIsCalculated(false);
  };

  return (
    <div className="budget-calculator">
      <div className="calculator-container">
        <div className="input-section">
          <h2>Enter Your Financial Details</h2>
          <div className="input-grid">
            <div className="input-group">
              <label htmlFor="income">Monthly Income (₹)</label>
              <input
                type="number"
                id="income"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
                placeholder="Enter monthly income"
                min="0"
                step="0.01"
              />
            </div>

            <div className="input-group">
              <label htmlFor="rent">Rent/EMI (₹)</label>
              <input
                type="number"
                id="rent"
                name="rent"
                value={formData.rent}
                onChange={handleInputChange}
                placeholder="Enter rent/EMI amount"
                min="0"
                step="0.01"
              />
            </div>

            <div className="input-group">
              <label htmlFor="food">Food Expenses (₹)</label>
              <input
                type="number"
                id="food"
                name="food"
                value={formData.food}
                onChange={handleInputChange}
                placeholder="Enter food expenses"
                min="0"
                step="0.01"
              />
            </div>

            <div className="input-group">
              <label htmlFor="transport">Transport Expenses (₹)</label>
              <input
                type="number"
                id="transport"
                name="transport"
                value={formData.transport}
                onChange={handleInputChange}
                placeholder="Enter transport expenses"
                min="0"
                step="0.01"
              />
            </div>

            <div className="input-group">
              <label htmlFor="others">Other Expenses (₹)</label>
              <input
                type="number"
                id="others"
                name="others"
                value={formData.others}
                onChange={handleInputChange}
                placeholder="Enter other expenses"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="button-group">
            <button 
              className="calculate-btn" 
              onClick={calculateBalance}
            >
              Calculate Balance
            </button>
            <button 
              className="reset-btn" 
              onClick={resetCalculator}
            >
              Reset
            </button>
          </div>
        </div>

        {isCalculated && (
          <div className="result-section">
            <div className={`balance-display ${getBalanceClass()}`}>
              <h3>Remaining Balance</h3>
              <div className="balance-amount">₹{balance?.toFixed(2)}</div>
              <p className="balance-message">{getBalanceMessage()}</p>
            </div>
            
            <div className="expense-summary">
              <h4>Expense Breakdown</h4>
              <div className="summary-grid">
                <div className="summary-item">
                  <span>Monthly Income:</span>
                  <span>₹{parseFloat(formData.income).toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span>Rent/EMI:</span>
                  <span>₹{parseFloat(formData.rent).toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span>Food Expenses:</span>
                  <span>₹{parseFloat(formData.food).toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span>Transport Expenses:</span>
                  <span>₹{parseFloat(formData.transport).toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span>Other Expenses:</span>
                  <span>₹{parseFloat(formData.others).toFixed(2)}</span>
                </div>
                <div className="summary-item total">
                  <span>Total Expenses:</span>
                  <span>₹{(parseFloat(formData.rent) + parseFloat(formData.food) + parseFloat(formData.transport) + parseFloat(formData.others)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetCalculator;