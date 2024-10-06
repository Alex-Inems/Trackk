'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addCategory, removeCategory } from '@/store/categorySlice';
import { setCurrency } from '@/store/currencySlice';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

const Settings: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories.categories) as string[]; // Ensure it’s an array of strings
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency) as string;
  const dispatch = useDispatch();

  const [newCategory, setNewCategory] = useState<string>('');
  const [currency, setCurrencyInput] = useState<string>(selectedCurrency);

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      dispatch(addCategory(newCategory)); // Dispatch the action to add the category
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    dispatch(removeCategory(category)); // Dispatch the action to remove the category
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value;
    setCurrencyInput(newCurrency);
    dispatch(setCurrency(newCurrency)); // Dispatch the action to update the currency
  };

  return (
    <ProtectedRoute>
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-blue-600">Settings</h1>

      {/* Budget Categories */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">Budget Categories</h2>
        <ul className="mt-2 space-y-4">
          {categories.map((category, index) => (
            <li
              key={index} // Use index if categories do not have unique ids
              className="flex justify-between items-center bg-gray-100 rounded-lg p-4 shadow-sm transition duration-200 hover:bg-gray-200"
            >
              <span className="text-gray-700">{category}</span>
              <button
                onClick={() => handleRemoveCategory(category)}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add New Category */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Add New Category</h2>
        <div className="flex mt-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
            className="border rounded-md p-2 flex-grow text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={handleAddCategory}
            className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-all"
          >
            Add
          </button>
        </div>
      </div>

      {/* Currency Settings */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800">Currency Settings</h2>
        <div className="mt-2">
          <label className="text-gray-800 font-semibold mr-4">Select Currency</label>
          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="border rounded-md p-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="NGN">NGN - Nigerian Naira</option>
            {/* Add more currencies as needed */}
          </select>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default Settings;
