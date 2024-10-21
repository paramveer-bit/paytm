import db from "@repo/db/client"
import { auth } from '@clerk/nextjs/server'

interface SessionClaims {
    user_id?: {
        id: number;
    };
}

export default async function p2pTransfer(toUserId: number, amount: number) {
    const session: any = auth().sessionClaims

    // Zod validation

    if (!session || !session.user_id || !session.user_id?.id) {
        return {
            message: "Unauthenticated request"
        }
    }

    const id = Number(session.user_id?.id)

    const currUser = await db.balance.findFirst({
        where: {
            userId: id
        }
    })

    if (!currUser) return { message: "Unauthenticated request" }

    if (currUser?.amount - currUser?.locked < amount) {
        return { message: "Insufficent Balance" }
    }

    const ToUser = await db.user.findFirst({
        where: {
            id: toUserId
        }
    })

    if (!ToUser) {
        return { message: "User Does Not Exists" }
    }

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: id
                },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            }),
            db.balance.updateMany({
                where: {
                    userId: toUserId
                },
                data: {
                    amount: {
                        increment: amount
                    }
                }
            }),
            db.p2pTransfer.create({
                data: {
                    amount: amount,
                    fromUserId: id,
                    toUserId: toUserId,
                    startTime: new Date(),

                }
            })
        ])
        return { message: "Successfull transfer of money" }
    } catch (error) {
        console.error(error);
        return { message: "Error occur while transfering money" }
    }

}