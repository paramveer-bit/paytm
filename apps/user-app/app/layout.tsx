import { auth } from "@clerk/nextjs/server"
import {ClerkProvider,UserButton} from '@clerk/nextjs'
// import  Appbar  from "@repo/ui/appbar"
import './globals.css'
import { Toaster } from "../components/ui/toaster"
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'PayNext',
  description: '...',
}


export default function RootLayout({  children,}: {children: React.ReactNode}) {


  const {userId} = auth()
  return (
      <html lang="en">]
        <body className="bg-slate-300">
          <ClerkProvider>
            {children}
            <Toaster />
            
          </ClerkProvider>
        </body>
      </html>
  )
}