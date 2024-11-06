import express from "express";
import cors from 'cors';
import db from "@repo/db/client"

const corsOptions = {
    origin: 'http://localhost:3001', // Allow requests from this origin
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

const app = express();
app.use(express.json())

app.use(cors(corsOptions))

app.get("/hello", async (req, res) => {
    res.json({
        message: "Hello hi"
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
    // Updating in db,add txn
    try {
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

