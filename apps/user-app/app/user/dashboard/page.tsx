'use client'
import { useEffect, useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { ArrowRightLeft, CreditCard, Home, PlusCircle, SendHorizontal, Settings, User, Wallet } from "lucide-react"
import axios from "axios"
import Link from "next/link"
import DateFormater from "../../../helpers/dateFormates"


type user = {
  name? : string|null,
  email? : string|null,
  number? : string|null
}

type transaction = {
  id : number,
  amount : number,
  startTime : string,
  fromUser? : user,
  toUser? : user,
  type : string,
  status? : string,
  provider?:string,
  type2? : string
}

export default function Component() {
  const [balance,setBalance] = useState<number>(0);
  const [transactions,setTransactions] = useState<transaction[]>([]);

  const fetchTransaction = async ()=>{
    try {
      const res = await axios.get("/api/recent-transactions")
      setTransactions(res.data.data)
    } catch (error) {
        console.error(error);
        console.log("Error in fetching User transactions")
    }
  }
  const fetchBalance = async ()=>{
    try {
      const res = await axios.get("/api/user-balance")
      setBalance(res.data.data.amount)
    } catch (error) {
        console.error(error);
        console.log("Error while fetching user")            
    }
  }

  useEffect(()=>{
    fetchBalance()
    fetchTransaction()
  },[])



  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">MyWallet</h1>
          <h2 className="text-2xl font-semibold text-gray-800">Welcome back, John!</h2>
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Balance Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Balance</CardTitle>
            <CardDescription>Current available balance in your wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">₹ {balance}</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-20 text-lg">
            <Link href={"/user/transfer"} className="flex">            
              <PlusCircle className="mr-2 h-5 w-5 my-auto" />
                Add Money
            </Link>

          </Button>
          <Button className="h-20 text-lg" variant="outline">
            <SendHorizontal className="mr-2 h-5 w-5" />
            Send Money
          </Button>
        </div>

        {/* Recent Transactions */}
        <Card className="h-[38vh]">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest wallet activities</CardDescription>
          </CardHeader>
          <CardContent className="overflow-y-scroll h-[70%]">
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                  <div>
                    <p className={`font-medium ${transaction.type2=='Failed'?'text-red-500':''}`}>{transaction.type2} {transaction.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      {   transaction.toUser?.name || transaction.toUser?.email || transaction.toUser?.number
                        ||
                          transaction.fromUser?.name ||transaction.fromUser?.email || transaction.fromUser?.number
                        || 
                          transaction.provider
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${transaction.type2 === 'Received' || transaction.type2 === 'Added' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type2 === 'Received' || transaction.type2 === 'Added' ? '+' : transaction.type2==='Sent'?'-':''}₹{transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">{DateFormater(transaction.startTime)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}