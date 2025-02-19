import { NextResponse } from "next/server"
import db from "@repo/db/client"
import { auth } from '@clerk/nextjs/server'

export async function GET() {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    // @ts-ignore
    const user: any = auth().sessionClaims?.user_id

    if (!user) {
        return new Response('No User Found. Login First', { status: 401 })
    }

    const id = user.id

    try {
        const res = await db.user.findFirst({
            where: {
                id: id
            }
        })

        if (!res) {
            return NextResponse.json({ success: false, message: "Some Error occured while fethcing user details" }, { status: 500 })
        }
        return NextResponse.json({ success: true, message: "user details Fetched SuccessFully", data: res }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
    }




}