import { NextResponse } from "next/server"
import db from "@repo/db/client"
import { auth } from '@clerk/nextjs/server'

type user = {
    id?: number
}

export async function GET(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const user: any = auth().sessionClaims?.user_id

    if (!user) {
        return new Response('No User Found. Login First', { status: 401 })
    }

    const id = user.id

    try {
        const res = await db.balance.findFirst({
            where: {
                userId: id
            }
        })

        if (!res) {
            return NextResponse.json({ success: false, message: "Some Error occured while fethcing user balance" }, { status: 500 })
        }
        return NextResponse.json({ success: true, message: "Balance Fetched SuccessFully", data: res }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
    }




}