import { auth } from "@clerk/nextjs/server"
import {ClerkProvider,UserButton} from '@clerk/nextjs'
import  Appbar  from "@repo/ui/appbar"
import './globals.css'



export default function RootLayout({  children,}: {children: React.ReactNode}) {


  const {userId} = auth()
  return (
      <html lang="en">
        <body className="bg-slate-300">
          <ClerkProvider>
            <Appbar user={userId} UserButton={UserButton} />
            {children}
            
          </ClerkProvider>
        </body>
      </html>
  )
}