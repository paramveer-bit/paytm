'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios';
import ProcessingPayment from '../../../components/PaymentLoader'
import SuccessPayment from '../../../components/Success'
import FailedPayment from '../../../components/Failed'


type trans = {
    amount : number,
    id : number,
    startTime : string,
    status : "Processing" | "Success" | "Failure"
}

function Payment() {

    const[transaction,setTransaction] = useState<trans|null>(null);
    const[status,setStatus] = useState<"Processing" | "Success" | "Failure"|null>();
    const[timeLeft,setTimeLeft] = useState(0);

    const[fetching,setFetching] = useState(true);

    function startPolling(callback: () => boolean | void, t: number): void {
        const interval = setInterval(() => {
          // If the callback returns true, stop polling
          const shouldStop = callback();
          if (shouldStop) {
            clearInterval(interval);
          }
        }, 1000); // 1000 milliseconds = 1 second
      
        // Stop polling after t seconds
        setTimeout(() => {
          clearInterval(interval);
        }, t * 1000); // t * 1000 milliseconds
      }


    const param = useParams<{pid : string}>()
    const transactionId = param.pid

    const changeStatus = async (status : string)=>{
        try {
            const res = await axios.post("/api/change-transactionStatus",{transId : transactionId, status : status})
        } catch (error) {
            console.error(error)
            console.log("Error while changing transaction status")  
        }
    }

    const fetchTransaction = async()=>{
        try {
            const res = await axios.post("/api/payment-status",{transId : transactionId})
            setTransaction(res.data.data)
        } catch (error) {
            console.error(error)
            console.log("Error while fetching transaction details") 
            
        }
    }

    useEffect(()=>{
        
        fetchTransaction()
    },[])

    useEffect(()=>{
        console.log(transaction)
        if(transaction){
            setStatus(transaction.status)
            
            const date = new Date();
            date.setMinutes(date.getMinutes() + 5);
            const date2 = new Date("2024-11-07T21:03:22.493Z");
            setTimeLeft(date2.getTime() - date.getTime())
        }
        setFetching(false)
    },[transaction])

    useEffect(()=>{
        if(timeLeft <= 0 && status === "Processing"){
            console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{[")

            changeStatus("Failure")
        }
        if(status === "Processing"){
            startPolling(()=>{
                fetchTransaction()
                if(transaction?.status === "Success"){
                    return true
                }
                else if(transaction?.status === "Failure"){
                    return true
                }
            }, timeLeft)
        }
    },[timeLeft])

    if(fetching){
        return <div>Loading....</div>
    }
    else if(!fetching && !transaction){
        return <div>Transaction not found</div>
    }
    else{
        if(status === "Processing"){
            return <ProcessingPayment redirectMinutes={timeLeft/60}/>
        }
        else if(status === "Success"){
            return <SuccessPayment id={transaction?.id||0} amount={transaction?.amount||0} date={transaction?.startTime || ""}/>
        }   
        else if(status === "Failure"){
            return <FailedPayment id={transaction?.id || 0} amount={transaction?.amount||0}/>
        }
    }

    return (
        <div>page</div>
    )
}

export default Payment
