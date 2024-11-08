import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export default function Component({id,amount}:{id:number,amount:number}) {
  const transactionDetails = {
    id: "TRX123456789",
    amount: "$99.99",
    date: new Date().toLocaleDateString(),
    errorCode: "ERR_INSUFFICIENT_FUNDS"
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-16 h-16 text-red-500" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-red-600">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your payment could not be processed. Please check your payment details and try again later.
            </AlertDescription>
          </Alert>
          <div className="border-t border-gray-200 pt-4">
            <dl className="divide-y divide-gray-200">
              <div className="flex justify-between py-2">
                <dt className="text-sm font-medium text-gray-500">Transaction ID</dt>
                <dd className="text-sm text-gray-900">{id}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-sm font-medium text-gray-500">Amount</dt>
                <dd className="text-sm text-gray-900">Rs. {amount}</dd>
              </div>
            </dl>
          </div>
          <div className="text-sm text-gray-500">
            <h3 className="font-medium mb-2">Next steps:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Check your payment method and ensure you have sufficient funds.</li>
              <li>Verify that your payment details are correct.</li>
              <li>Wait a few minutes and try the transaction again.</li>
              <li>If the problem persists, please contact your bank or financial institution.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}