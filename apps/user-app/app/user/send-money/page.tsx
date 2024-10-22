'use client'
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { ArrowLeft, Search, Send } from "lucide-react"
import axios from "axios"
import SendMoney from "../../../helpers/p2pTransfer"
import { useToast } from "../../../hooks/use-toast"


type user = {
  id : number,
  email : string,
  number : number,
  name? : string
}

export default function Component() {
  const [checking,setChecking] = useState<boolean>(false);
  const [number,setNumber] = useState<string>("");
  const [recipient, setRecipient] = useState<user|null>()
  const [suggestedUserList,setSuggestedUserList] = useState<user[]>([])
  const [amount, setAmount] = useState("")

  const[sending,setSending] = useState<boolean>(false)
  const { toast } = useToast()


  const handelSelector = (u:user) =>{
    setRecipient(u)
    setNumber(u.number+"")
    setSuggestedUserList([])
  }

  const debounced = useDebounceCallback(setNumber,300)


  const checkNumber = async () =>{
    // if(!number) setRecipient();
    if(number){
      setChecking(true)
      try {
        const res = await axios.post('/api/check-user',{number:`+91${number}`})
        console.log(res.data.data)
        setSuggestedUserList(res.data.data)

      } catch (error) {
        console.error(error);
        console.log("Error while checking for number")
      }
    }
  }

  useEffect(()=>{
    console.log(number);
    checkNumber()
  },[number])


  const setAllTODeafult = () =>{
    setChecking(false)
    setSuggestedUserList([])
    setNumber("")
    debounced("")
    setRecipient(null)
  }



  const handleSubmit = async (e: React.FormEvent) => {
    setSending(true)
    e.preventDefault()
    console.log(`Sending ₹${amount} to ${recipient}`)
    if(!recipient || !recipient?.id){
      toast({
        title : "Select user 1st",
        type : "destructive"
      })
    }
    else if(Number(amount)<=0){
      toast({
        title : "Enter a valid amount",
        type : "destructive"
      })
    }
    else{
      const res : {message:string} = await SendMoney(recipient.id , Number(amount))
      if(res.message === "Unauthenticated request"){
        toast({
          title : res.message,
          type : "destructive"
        })
      }
      else if(res.message === "Insufficent Balance"){
        toast({
          title : res.message,
          type : "destructive"
        })
      }
      else if(res.message === "Error occur while transfering money"){
        toast({
          title : res.message,
          type : "description"
        })
      }
      else if(res.message === "Successfull transfer of money"){
        toast({
          title : res.message,
          type : "Successfull"
        })
        setAllTODeafult()
      }
      
    }
    setSending(false)
    // Reset form or show confirmation
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-5">
          <h1 className="text-3xl font-bold text-gray-800">Send Money</h1>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Transfer Details</CardTitle>
            <CardDescription>Send money to another wallet user</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="number"
                      placeholder="Search by Phone Number"
                      value={number}
                      onChange={(e) => debounced(e.target.value)}
                      className="pl-8"
                    />
                    {suggestedUserList.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                        {suggestedUserList.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handelSelector(user)}
                          >
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name!=null?user.name:user.email}`} alt={user.name} />
                              <AvatarFallback>{user.name!=null?user?.name?.charAt(0) : user.email.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name||user.email}</p>
                              <p className="text-sm text-gray-500">{user.number}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>  
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (in Rupees)</Label>
                  <div className="relative">
                    <span className="absolute left-2 top-2 text-muted-foreground">₹</span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-6"
                    />
                  </div>
                </div>

                    {/* Make route for recent users name user it here */}


                <div className="space-y-2">
                  <Label>Recent Recipients</Label>
                  <div className="flex space-x-2 overflow-x-auto py-2">
                    {suggestedUserList.length >0 && suggestedUserList.map((user,idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="flex-shrink-0"
                        onClick={() => handelSelector(user)}
                      >
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.email}`} alt={user.name} />
                          <AvatarFallback>{"fu"}</AvatarFallback>
                        </Avatar>
                        {user.email}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" onClick={handleSubmit} disabled={sending} >
              <Send className="mr-2 h-4 w-4" />
              Send Money
            </Button>
          </CardFooter>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Transfer Summary</CardTitle>
            <CardDescription>Review your transfer details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">From</span>
                <span className="font-medium">Your Wallet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">To</span>
                <span className="font-medium">{recipient?.name || recipient?.email || recipient?.number || "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">{amount ? `₹${amount}` : "₹0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-medium">₹0.00</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Total</span>
                <span className="font-bold text-primary">{amount ? `₹${amount}` : "₹0.00"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}