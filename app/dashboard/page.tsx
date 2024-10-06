'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '@/store/store';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define types for transactions and user state
interface Transaction {
  id: number;
  date: string;
  amount: number;
  description: string;
}

interface User {
  email: string;
  name: string;
  photoUrl: string;
}

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user) as User;
  const transactions = useSelector((state: RootState) => state.transactions.transactions) as Transaction[];
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const exchangeRate = useSelector((state: RootState) => state.currency.exchangeRate); // Get exchange rate
  const balance = useSelector((state: RootState) => state.user.balance) as number; // Fetch balance
  const currencySymbol = selectedCurrency === 'USD' ? '$' : selectedCurrency;

  const calculateMonthlyExpenditure = (transactions: Transaction[]): Record<string, number> => {
    const monthlyTotals: Record<string, number> = {};

    transactions.forEach(transaction => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
      const amount = transaction.amount * exchangeRate; // Convert amount to selected currency

      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }
      monthlyTotals[month] += amount;
    });

    return monthlyTotals;
  };

  const monthlyExpenditure = calculateMonthlyExpenditure(transactions);

  const chartLabels = Object.keys(monthlyExpenditure).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const chartData = chartLabels.map(label => monthlyExpenditure[label] || 0);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Monthly Expenditure',
        data: chartData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Spending Over the Last Year',
        color: 'white',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-white">Dashboard</h1>

        {user?.email ? (
          <div className="bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
            <div className="flex flex-col sm:flex-row items-center mb-6">
              <Image
                src={user.photoUrl}
                alt={user.name}
                width={96} // Set width as per your design
                height={96} // Set height as per your design
                className="rounded-full border-2 border-blue-400 mr-4 transition-transform transform hover:scale-110 duration-300"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-4xl font-semibold text-white">Welcome, {user.name}!</h2>
                <p className="text-gray-400">
                  Your email: <span className="font-medium">{user.email}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
              <div className="bg-blue-600 text-white rounded-lg p-4 shadow transition-transform transform hover:scale-105 duration-300">
                <h3 className="font-semibold text-2xl">Total Transactions</h3>
                <p className="text-3xl mt-2">{transactions.length}</p>
              </div>
              <div className="bg-green-600 text-white rounded-lg p-4 shadow transition-transform transform hover:scale-105 duration-300">
                <h3 className="font-semibold text-2xl">Recent Activity</h3>
                <p className="text-3xl mt-2">
                  {currencySymbol}
                  {(transactions.reduce((total, transaction) => total + transaction.amount * exchangeRate, 0)).toFixed(2)} spent
                </p>
              </div>
              <div className="bg-yellow-600 text-white rounded-lg p-4 shadow transition-transform transform hover:scale-105 duration-300">
                <h3 className="font-semibold text-2xl">Account Balance</h3>
                <p className="text-3xl mt-2">
                  {currencySymbol}
                  {(balance * exchangeRate).toFixed(2)} {/* Display converted balance */}
                </p>
              </div>
            </div>

            <div className="mb-8 h-64">
              <h3 className="text-2xl font-semibold mb-4 text-white">Monthly Spending Trend</h3>
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                <Bar data={data} options={options} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <h3 className="text-2xl font-semibold mb-4 text-white">Recent Transactions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                          <p className="font-semibold text-gray-800">{transaction.description}</p>
                        </div>
                        <div className={`text-lg font-bold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {currencySymbol}
                          {(transaction.amount * exchangeRate).toFixed(2)} {/* Display converted amount */}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-gray-400 font-semibold">
                    No recent transactions.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">You are not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
