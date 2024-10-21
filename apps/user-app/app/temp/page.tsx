'use client'
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { ArrowLeft, Search, Send } from "lucide-react"

// Mock data for user suggestions
const userSuggestions = [
  { id: "1234567890", name: "Amit Kumar", avatar: "AK" },
  { id: "2345678901", name: "Priya Sharma", avatar: "PS" },
  { id: "3456789012", name: "Rahul Singh", avatar: "RS" },
  { id: "4567890123", name: "Neha Patel", avatar: "NP" },
  { id: "5678901234", name: "Vikram Mehta", avatar: "VM" },
]

export default function Component() {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [suggestions, setSuggestions] = useState<typeof userSuggestions>([])
  const [selectedUser, setSelectedUser] = useState<(typeof userSuggestions)[0] | null>(null)

  useEffect(() => {
    if (recipient.length > 0 && !selectedUser) {
      const filtered = userSuggestions.filter(user => 
        user.id.startsWith(recipient) || user.name.toLowerCase().includes(recipient.toLowerCase())
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [recipient, selectedUser])

  const handleSelectUser = (user: (typeof userSuggestions)[0]) => {
    setSelectedUser(user)
    setRecipient(user.id)
    setSuggestions([])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Sending ₹${amount} to ${selectedUser ? selectedUser.name : recipient}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
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
                      id="recipient"
                      placeholder="Enter mobile number or name"
                      value={recipient}
                      onChange={(e) => {
                        setRecipient(e.target.value)
                        setSelectedUser(null)
                      }}
                      className="pl-8"
                    />
                    {suggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                        {suggestions.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelectUser(user)}
                          >
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
                              <AvatarFallback>{user.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.id}</p>
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
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" onClick={handleSubmit}>
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
                <span className="font-medium">
                  {selectedUser ? (
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedUser.name}`} alt={selectedUser.name} />
                        <AvatarFallback>{selectedUser.avatar}</AvatarFallback>
                      </Avatar>
                      {selectedUser.name} ({selectedUser.id})
                    </div>
                  ) : (
                    recipient || "Not selected"
                  )}
                </span>
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