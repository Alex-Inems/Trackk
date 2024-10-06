'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TransactionList from '../../components/TransactionList/TransactionList';
import AddTransactionForm from '../../components/AddTransactionForm/AddTransactionForm';
import { addTransaction, updateTransaction, deleteTransaction } from '@/store/transactionSlice';
import { RootState } from '@/store/store';
import { FaFilter, FaSearch, FaSortAmountUpAlt, FaSortAmountDownAlt, FaPlusCircle } from 'react-icons/fa';
import Chart from 'react-google-charts'; 
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

const TransactionsPage: React.FC = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const exchangeRate = useSelector((state: RootState) => state.currency.exchangeRate); // Get exchange rate

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<'date' | 'amount' | null>(null);
  const [filterRange, setFilterRange] = useState({ startDate: '', endDate: '' });

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const income = transactions
      .filter((t) => t.amount > 0)
      .reduce((acc, curr) => acc + curr.amount * exchangeRate, 0); // Convert income to selected currency

    const expenses = transactions
      .filter((t) => t.amount < 0)
      .reduce((acc, curr) => acc + Math.abs(curr.amount * exchangeRate), 0); // Convert expenses to selected currency

    setTotalIncome(income);
    setTotalExpenses(expenses);
  }, [transactions, exchangeRate]);

  const balance = totalIncome - totalExpenses;

  const handleAddTransaction = (transaction: { id: number; description: string; amount: number; date: string }) => {
    dispatch(addTransaction(transaction));
  };

  const handleUpdateTransaction = (updatedTransaction: { id: number; description: string; amount: number; date: string }) => {
    dispatch(updateTransaction(updatedTransaction));
  };

  const handleDeleteTransaction = (transactionId: number) => {
    dispatch(deleteTransaction(transactionId));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (option: 'date' | 'amount') => {
    setSortOption(option);
  };

  const filteredTransactions = transactions
    .filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((transaction) => {
      if (!filterRange.startDate || !filterRange.endDate) return true;
      const transactionDate = new Date(transaction.date).getTime();
      return (
        transactionDate >= new Date(filterRange.startDate).getTime() &&
        transactionDate <= new Date(filterRange.endDate).getTime()
      );
    })
    .sort((a, b) => {
      if (sortOption === 'amount') return b.amount - a.amount;
      if (sortOption === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      return 0;
    });

  return (
    <ProtectedRoute>
    <div className="bg-gradient-to-br bg-slate-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg p-10 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-blue-300 rounded-full opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-300 rounded-full opacity-40"></div>

        <h1 className="lg:text-5xl sm:text-xl font-extrabold text-center text-blue-300 mb-8">Transactions</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white bg-opacity-60 rounded-lg p-6 text-center shadow-md">
            <h2 className="text-lg font-semibold text-green-500">Total Income</h2>
            <p className="text-2xl font-bold">
              {selectedCurrency} {totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="bg-white bg-opacity-60 rounded-lg p-6 text-center shadow-md">
            <h2 className="text-lg font-semibold text-red-500">Total Expenses</h2>
            <p className="text-2xl font-bold">
              {selectedCurrency} {totalExpenses.toFixed(2)}
            </p>
          </div>
          <div className="bg-white bg-opacity-60 rounded-lg p-6 text-center shadow-md">
            <h2 className="text-lg font-semibold text-blue-500">Balance</h2>
            <p className="text-2xl font-bold">
              {selectedCurrency} {balance.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <Chart
            chartType="PieChart"
            data={[
              ['Type', 'Amount'],
              ['Income', totalIncome],
              ['Expenses', totalExpenses],
            ]}
            options={{
              pieHole: 0.4,
              slices: [
                { color: '#4caf50' },
                { color: '#f44336' },
              ],
              backgroundColor: 'transparent',
              chartArea: { width: '90%', height: '70%' },
            }}
            width={'100%'}
            height={'300px'}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full md:w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="text-gray-600" />
          </div>

          <div className="lg:flex md:flex sm:flex-col items-center space-x-2">
            <label className="text-sm font-medium">From:</label>
            <input
              type="date"
              value={filterRange.startDate}
              onChange={(e) => setFilterRange({ ...filterRange, startDate: e.target.value })}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none text-black"
            />
            <div className="lg:hidden md:hidden"></div>
            <label className="text-sm font-medium mt-2">To:</label>
            <div className="lg:hidden md:hidden"></div>
            <input
              type="date"
              value={filterRange.endDate}
              onChange={(e) => setFilterRange({ ...filterRange, endDate: e.target.value })}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none text-black"
            />
            <FaFilter className="text-gray-600 mt-2" />
          </div>

          <button
            onClick={() => handleSort(sortOption === 'date' ? 'amount' : 'date')}
            className="p-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition duration-300"
          >
            {sortOption === 'date' ? <FaSortAmountUpAlt /> : <FaSortAmountDownAlt />}
            <span className="ml-2">{sortOption === 'date' ? 'Sort by Amount' : 'Sort by Date'}</span>
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Add New Transaction</h2>
          <AddTransactionForm onAddTransaction={handleAddTransaction} />
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Transaction List</h2>
          <TransactionList
            transactions={filteredTransactions} // Use filtered transactions here
            onUpdateTransaction={handleUpdateTransaction}
            onDeleteTransaction={handleDeleteTransaction}
            selectedCurrency={selectedCurrency}
            exchangeRate={exchangeRate} // Pass exchange rate to TransactionList component
          />
        </div>

        <button className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
          <FaPlusCircle size={24} />
        </button>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default TransactionsPage;
