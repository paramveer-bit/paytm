import { NextRequest, NextResponse } from "next/server";
import { clerkClient, User } from '@clerk/nextjs/server'
import { getAuth } from "@clerk/nextjs/server";
import { auth } from '@clerk/nextjs/server'

export async function GET(req: NextRequest) {
    console.log(auth().sessionClaims)
    const res = "pam"
    return NextResponse.json({ message: "Hello World" })
}