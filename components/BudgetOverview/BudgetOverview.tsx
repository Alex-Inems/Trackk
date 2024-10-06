import React from 'react';

interface BudgetOverviewProps {
  balance: number;
  income: number;
  expenses: number;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ balance, income, expenses }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold">Current Balance: ${balance}</h2>
      <p>Total Income: ${income}</p>
      <p>Total Expenses: ${expenses}</p>
    </div>
  );
};

export default BudgetOverview;
