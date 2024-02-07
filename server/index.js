const express = require("express")
const cors = require("cors")
const Razorpay = require("razorpay")
require('dotenv').config()
const app = express()

app.use(cors({
    origin: ["https://netflix-app-nine-delta.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}))

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.post("/order", async (req , res ) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.key_id,
            key_secret: process.env.key_secret,
        })
    
        const option = req.body;
        const order = await razorpay.orders.create(option);
    
        if(!order){
            return res.status(500).send('error')
        }else{
            res.json(order)
            
        } 
    } catch (error) {
        console.log(error);
        return res.status(500).send('error')
    }
   
})

app.listen(2000, () => {
    console.log("server running....");
})
