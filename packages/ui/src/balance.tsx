import React from 'react';

function BalanceDisplay ({amount,locked}:{amount:number,locked:number}) {
  // Hardcoded values
  const totalBalance = amount + locked;

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Balance</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-700">Unlocked balance</span>
          <span className="text-gray-900">{amount} INR</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Total Locked Balance</span>
          <span className="text-gray-900">{locked} INR</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Total Balance</span>
          <span className="text-gray-900">{totalBalance} INR</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceDisplay;
