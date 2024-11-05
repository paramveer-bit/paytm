import { NextResponse } from "next/server";
import onRampTransaction from "../../../helpers/rampTransaction"

export async function GET() {
    const res = await onRampTransaction("hbhjbjhbjhb", 10000)
    console.log("======")
    console.log(res)
    return NextResponse.json({ data: res, message: "Hello World" })
}