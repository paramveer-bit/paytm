import React, { useState } from 'react';

const AddMoneyForm: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState(''); // Default to empty

  const banks = [
    'HDFC Bank',
    'ICICI Bank',
    'State Bank of India (SBI)',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Yes Bank',
    'Union Bank of India',
    'Canara Bank',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Amount: ${amount}, Bank: ${bank}`);
    // Add your form submission logic here
  };

  return (
    <div className="w-[50%] h-max p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Add Money</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-1">
            Bank
          </label>
          <select
            id="bank"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a bank
            </option>
            {banks.map((bankName) => (
              <option key={bankName} value={bankName}>
                {bankName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Money
        </button>
      </form>
    </div>
  );
};

export default AddMoneyForm;
