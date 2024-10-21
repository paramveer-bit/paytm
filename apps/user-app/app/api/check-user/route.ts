import { NextResponse } from "next/server"
import db from "@repo/db/client"
import { auth } from '@clerk/nextjs/server'

type user = {
    id?: number
}

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const user: any = auth().sessionClaims?.user_id
    const { number }: { number: string } = await req.json()

    console.log("--------------------" + number)

    if (!user) {
        return new Response('No User Found. Login First', { status: 401 })
    }

    const id = user.id

    try {
        const res = await db.user.findMany({
            take: 5,
            where: {
                number: {
                    startsWith: number
                }
            }
        })

        if (!res) {
            return NextResponse.json({ success: false, message: "No user found" }, { status: 401 })
        }
        return NextResponse.json({ success: true, message: "Balance Fetched SuccessFully", data: res }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
    }




}