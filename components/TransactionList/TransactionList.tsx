'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { AppDispatch } from '@/store/store';
import { fetchConversionRates } from '@/services/currencyService'; // Import the currency service

export type Transaction = {
  id: number;
  description: string;
  amount: number;
  date: string;
};

export interface TransactionListProps {
  transactions: Transaction[]; // Add transactions to props
  onUpdateTransaction: (updatedTransaction: Transaction) => void;
  onDeleteTransaction: (transactionId: number) => void;
  selectedCurrency: string; // Add selectedCurrency to props
  exchangeRate: number; // Add exchangeRate to props
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onUpdateTransaction,
  onDeleteTransaction,
  selectedCurrency,
  exchangeRate,
}) => {
  const [mounted, setMounted] = useState(false);
  const dispatch: AppDispatch = useDispatch(); // Initialize dispatch here

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Fetch conversion rate whenever selected currency changes
    const getConversionRate = async () => {
      try {
        await dispatch(fetchConversionRates('NGN', selectedCurrency)); // Assuming base currency is NGN
      } catch (error) {
        console.error('Error fetching conversion rates:', error);
      }
    };

    getConversionRate();
  }, [selectedCurrency, dispatch]);

  if (!mounted) {
    return null; // Avoid rendering until the client is mounted
  }

  return (
    <div className="sm:bg-inherit bg-gradient-to-br from-gray-100 to-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-8 relative overflow-hidden">
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions found.</p>
      ) : (
        <ul className="space-y-6">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex flex-col sm:flex-row justify-between items-center bg-slate-900 bg-opacity-80 p-6 rounded-lg shadow-md hover:bg-opacity-100 transition duration-200 hover:shadow-lg"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-x-4 w-full">
                <div className="flex-1 space-y-1 sm:flex-col">
                  <p className="text-xl font-semibold text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                  <span
                    className={`text-lg font-bold ${
                      transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {selectedCurrency} {(transaction.amount * exchangeRate).toFixed(2)}
                  </span>
                  <button
                    onClick={() => onUpdateTransaction(transaction)}
                    className="bg-blue-950 rounded lg:p-1 text-white hover:text-blue-700 focus:outline-none transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="bg-red-950 rounded text-white hover:text-red-700 focus:outline-none transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
