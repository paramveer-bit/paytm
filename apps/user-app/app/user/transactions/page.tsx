"use client"

import { useEffect, useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"

import DateFormater from "../../../helpers/dateFormates"
import axios from "axios"


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
  provider?:string
}



export default function TransactionTable() {
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all")
  const [transactions,setTransactions] = useState<transaction[]>([]);

  const fetchTransaction = async ()=>{
    try {
      const res = await axios.get("/api/user-transactions")
      setTransactions(res.data.data)
    } catch (error) {
        console.error(error);
        console.log("Error in fetching User transactions")
    }
  }

  useEffect(()=>{
    fetchTransaction()
  },[])

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true
    return transaction.type === filter
  })

  return (
    <div className="container mx-auto p-4 bg-gray-100 h-[90vh]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {filter.charAt(0).toUpperCase() + filter.slice(1)} <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilter("all")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("credit")}>Credit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("debit")}>Debit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction,idx) => (
            <TableRow key={idx} className={`${transaction.status==="Processing"||transaction.status==="Failure"?"bg-red-300":""}`}>
              <TableCell>
                <div className="font-medium">
                  {   transaction.toUser?.name || transaction.toUser?.email || transaction.toUser?.number
                    ||
                      transaction.fromUser?.name ||transaction.fromUser?.email || transaction.fromUser?.number
                    || 
                      transaction.provider
                  }
                </div>
                <div className="text-sm text-muted-foreground">{DateFormater(transaction.startTime)}</div>
              </TableCell>
              <TableCell className="text-right">
                <span className={transaction.type === "credit" ? "text-green-600" : "text-red-600"}>
                  {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toFixed(2)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}