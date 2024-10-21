import React from 'react';
import dateFormater from '../helpers/dateFormates'


type Transaction = {
    id : number,
    status : "Success" | "Failure" | "Processing",
    amount : number,
    startTime : string
}

export default function RecentTrans({ transactions }: {transactions:Transaction[]}) {


  return (
    <div className="w-full mx-auto p-6 pr-1 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Recent Bank Transactions</h2>
      <div className="space-y-2 overflow-y-scroll h-64 pr-5">
        {transactions.length>0?
            transactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center">
                    <div>
                        {
                            transaction.status=="Success" ? <p className="text-gray-700"> Recieved</p>:
                            <p className={`text-gray-700 ${transaction.status=="Failure"?"text-red-500":"text-orange-500"}`}>
                                {transaction.status}
                            </p>
                        }
                    
                    <p className="text-sm text-gray-500">{dateFormater(transaction.startTime)}</p>
                    </div>
                    <span className={`text-green-600 ${transaction.status=="Failure"?"text-red-500":transaction.status==="Processing"?"text-orange-500":""}`}>
                        {transaction.amount}
                    </span>
                </div>
            )):
            <></>
            }
      </div>
    </div>
  );
};


