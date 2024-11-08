import { NextResponse, NextRequest } from "next/server"
import db from "@repo/db/client"
import { auth } from '@clerk/nextjs/server'


export async function POST(req: NextRequest) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    // @ts-ignore
    const { transId, status } = await req.json()


    const user: any = auth().sessionClaims?.user_id

    console.log("---------------------------------")

    if (!user) {
        return new Response('No User Found. Login First', { status: 401 })
    }

    const id = user.id

    if (!transId) {
        return NextResponse.json({ success: false, message: "Transaction Id not found" }, { status: 400 })
    }

    try {

        const transaction = await db.onRampTransaction.findFirst({
            where: {
                id: Number(transId)
            }
        })

        if (!transaction) {
            return NextResponse.json({ success: false, message: "Transaction not found" }, { status: 400 })
        }

        await db.onRampTransaction.update({
            where: {
                id: Number(transId)
            },
            data: {
                status: status
            }
        })

        return NextResponse.json({ success: true, message: "Status Updated successfully" }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
    }




}