import { NextRequest, NextResponse } from "next/server";
import { clerkClient, User } from '@clerk/nextjs/server'
import { getAuth } from "@clerk/nextjs/server";
import { auth } from '@clerk/nextjs/server'
import p2pTransfer from "../../../helpers/p2pTransfer";
import onRampTransaction from "../../../helpers/rampTransaction"

export async function GET(req: NextRequest) {
    const res = await onRampTransaction("hbhjbjhbjhb", 10000)
    console.log("======")
    console.log(res)
    return NextResponse.json({ data: res, message: "Hello World" })
}