"use client"
import { ReactNode } from "react"
import { RecoilRoot } from "recoil"
import { SessionProvider } from "next-auth/react";


function providers({children}:{children:ReactNode}) {
  return (
    <RecoilRoot>  
      <SessionProvider>
        {children}
      </SessionProvider>
    </RecoilRoot>
  )
}

export default providers