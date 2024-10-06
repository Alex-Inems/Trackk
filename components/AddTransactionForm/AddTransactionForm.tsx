import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { addTransaction } from '@/store/transactionSlice'; // Import addTransaction action
import { setCurrency } from '@/store/currencySlice'; // Import setCurrency action

// Define the props for the AddTransactionForm component
interface AddTransactionFormProps {
  onAddTransaction: (transaction: { id: number; description: string; amount: number; date: string; currency: string }) => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create transaction object
    const newTransaction = {
      id: Date.now(), // Example ID generation; consider a more robust solution
      description,
      amount,
      date: new Date().toISOString(),
      currency: selectedCurrency, // Include the selected currency
    };

    // Dispatch the addTransaction action to store the new transaction
    dispatch(addTransaction(newTransaction)); // Dispatch action to add the transaction

    // // Optionally call the passed-in onAddTransaction function
    // onAddTransaction(newTransaction); // Use the onAddTransaction prop if necessary

    // Clear the form
    setDescription('');
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-black">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 p-2 border rounded-md w-full text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Amount ({selectedCurrency})</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
          className="mt-1 p-2 border rounded-md w-full text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Currency</label>
        <select
          value={selectedCurrency}
          onChange={(e) => {
            dispatch(setCurrency(e.target.value)); // Update selected currency
          }}
          className="mt-1 p-2 border rounded-md w-full text-black"
        >
          <option value="USD">USD</option>
          <option value="NGN">Naira (NGN)</option>
          {/* Add more currencies as needed */}
        </select>
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white rounded-md p-2"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransactionForm;
