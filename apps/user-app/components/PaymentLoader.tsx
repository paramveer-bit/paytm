'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export default function Component({ redirectMinutes = 5 }: { redirectMinutes?: number }) {
  const [secondsLeft, setSecondsLeft] = useState(redirectMinutes * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevSeconds - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Processing Payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
          <p className="text-center text-muted-foreground">
            Please wait while we redirect you to the payment gateway. This may take up to {5} minutes.
          </p>
          <div className="text-3xl font-bold text-center tabular-nums">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
          <p className="text-sm text-center text-muted-foreground">
            Do not refresh or leave this page.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}