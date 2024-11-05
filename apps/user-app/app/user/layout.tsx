import { auth } from "@clerk/nextjs/server"
// @ts-ignore
import {UserButton} from '@clerk/nextjs'
import Sidebar from "@repo/ui/Sidebar"
import  Appbar  from "@repo/ui/appbar"



export default function RootLayout({  children,}: {children: React.ReactNode}) {

  const {userId} = auth()
  return (
    <div>
        <Appbar user={userId} UserButton={UserButton} />

      <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto">
              {children}
          </main>
      </div>   
    </div>
  )
}