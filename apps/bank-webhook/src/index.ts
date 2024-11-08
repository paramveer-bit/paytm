import express from "express";
import cors from 'cors';
import db from "@repo/db/client"

const corsOptions = {
    origin: 'https://baking-server.vercel.app', // Allow requests from this origin
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

const app = express();
app.use(express.json())

app.use(cors(corsOptions))

app.get("/hello", async (req, res) => {
    res.json({
        message: "Hello hi hii"
    })
})

app.post("/hdfcWebhook", async (req, res) => {
    // ZOD Validation   
    // Check hsfc server secret
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    const paymentInformation = {
        token: req.body.token,
        amount: req.body.amount,
        userId: req.body.user_identifier
    }


    console.log(paymentInformation)

    if (!paymentInformation.token || !paymentInformation.amount || !paymentInformation.userId) {
        res.status(400).json({
            message: "Invalid request"
        })
        return
    }
    console.log("----------------------------------")
    // Updating in db,add txn
    try {
        const result = await db.onRampTransaction.findFirst({
            where: {
                token: paymentInformation.token
            }
        });

        if (!result) {
            res.status(200).json({
                message: "Invalid token"
            })
            return
        }

        if (result && result.status === "Success") {
            res.status(200).json({
                message: "Already Captured"
            })
            return
        }

        const userResult = await db.user.findFirst({
            where: {
                id: Number(paymentInformation.userId)
            }
        });

        if (!userResult) {
            res.status(200).json({
                message: "Invalid user"
            })
            return
        }

        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(3009);

