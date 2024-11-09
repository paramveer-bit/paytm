"use server"
import db from "@repo/db/client"
import { auth } from '@clerk/nextjs/server'

interface SessionClaims {
    user_id?: {
        id: number;
    };
}



export default async function generate(provider: string, amount: number): Promise<{ message: string, tid?: string, userId?: number }> {

    const session: any = auth().sessionClaims
    console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")

    if (!session || !session.user_id || !session.user_id?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = (Math.random() * 1000).toString();
    await db.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session.user_id?.id),
            amount: amount
        }
    });

    return {
        message: "Done",
        tid: token,
        userId: session.user_id?.id
    }


}