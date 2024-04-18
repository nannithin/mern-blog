import express from "express";
import allRoutes from "./routes/main.js";
import { mongoose } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import admin from "firebase-admin";

import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.CLINET_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials: true
}))

//import your service account
admin.initializeApp({
    credential : admin.credential.cert(serviceAccount)
})

app.use('/api',allRoutes);

const mongooseConnection = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB CONNECTED")
    } catch (error) {
        console.log(error);
    }
}

app.listen(process.env.PORT,(req,res)=>{
    console.log("server running");
    mongooseConnection();
})
