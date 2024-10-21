import { NextRequest, NextResponse } from "next/server";
import { clerkClient, User } from '@clerk/nextjs/server'
import { getAuth } from "@clerk/nextjs/server";
import { auth } from '@clerk/nextjs/server'
import generate from "../../../helpers/rampTransaction";

export async function GET(req: NextRequest) {
    const res = await generate("bjhhjbjhb", 5000)
    console.log("======")
    console.log(res)
    return NextResponse.json({ data: res, message: "Hello World" })
}