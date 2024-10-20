import { auth } from "@clerk/nextjs/server"
import {ClerkProvider,UserButton} from '@clerk/nextjs'
import Sidebar from "@repo/ui/Sidebar"



export default function RootLayout({  children,}: {children: React.ReactNode}) {


  const {userId} = auth()
  return (
    <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
            {children}
        </main>
    </div>   
  )
}