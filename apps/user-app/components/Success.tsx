import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import DateFormatter from "../helpers/dateFormates"

export default function Component({id,amount,date}:{id:number,amount:number,date:string}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Thank you for your payment. Your transaction has been completed successfully.
          </p>
          <div className="border-t border-gray-200 pt-4">
            <dl className="divide-y divide-gray-200">
              <div className="flex justify-between py-2">
                <dt className="text-sm font-medium text-gray-500">Transaction ID</dt>
                <dd className="text-sm text-gray-900">{id}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-sm font-medium text-gray-500">Amount Paid</dt>
                <dd className="text-sm text-gray-900">Rs. {amount}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-sm font-medium text-gray-500">Date</dt>
                <dd className="text-sm text-gray-900">{DateFormatter(date)}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/user/dashboard">Go to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}