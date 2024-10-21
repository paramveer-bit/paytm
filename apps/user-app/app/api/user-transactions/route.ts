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
        const res = await db.user.findMany({
            where: {
                id: id
            },
            select: {
                OnRampTransaction: true,
                sentTransfers: true,
                receivedTransfers: true,
            }
        })

        const mergedArray = [
            ...res[0].OnRampTransaction.map(item => ({ ...item, type: 'OnRampTransaction' })),
            ...res[0].sentTransfers.map(item => ({ ...item, type: 'sentTransfers' })),
            ...res[0].receivedTransfers.map(item => ({ ...item, type: 'receivedTransfers' }))
        ];

        mergedArray.sort((a: any, b: any) => a.startTime - b.startTime);


        if (!res) {
            return NextResponse.json({ success: false, message: "Some Error occured while fethcing user Transactions" }, { status: 500 })
        }
        return NextResponse.json({ success: true, message: "Transactions Fetched SuccessFully", data: mergedArray }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
    }




}