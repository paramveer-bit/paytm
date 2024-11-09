'use client'
import React, { useEffect, useState } from 'react'
import AddMoney from "@repo/ui/AddMoney"
import Balance from "@repo/ui/Balance"
import RecentTrans from "@repo/ui/RecentTrans"
import axios from "axios"


type balance = {
    id:number,
    amount:number,
    locked:number,
    userId : number
}

type transaction = {
    id : number,
    status : "Success" | "Failure" | "Processing",
    amount : number,
    startTime : string
}

function Transfer() {

    const [balance,SetBalance] = useState<balance>()
    const[transaction,setTransactions] = useState<transaction[]>([]);

    const fetchBalance = async()=>{
        try {
            const res = await axios.get("/api/user-balance")
            SetBalance(res.data.data)
        } catch (error) {
            console.error(error);
            console.log("Error while fetching user")            
        }
    }

    const fetchTransactions = async() =>{
        try {
            const res = await axios.get("/api/user-bank-transactions")
            setTransactions(res.data.data)
        } catch (error) {
            console.error(error);
            console.log("Error while fetching transaction details")            
        }
    }

    useEffect(()=>{
        fetchBalance()
        fetchTransactions()
    },[])
    


  return (
    <div className='p-2 px-5 bg-gray-100 h-[90vh]'>
        <h1 className='px-5 text-5xl font-semibold text-violet-600'>Transfer</h1>
        <div className='flex justify-between w-full gap-5 mt-6 mx-auto overflow-hidden'>
            <AddMoney />
            <div className='w-[50%] flex flex-col gap-6'>
                <Balance amount={balance?.amount||0} locked={balance?.locked||0}/>
                <RecentTrans transactions={transaction} />
            </div>
        </div>
    </div>
  )
}

export default Transfer