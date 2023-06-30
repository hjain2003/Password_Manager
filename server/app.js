import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './dbconnection/conn.js';
import userRouter from './routes/user_routes.js';
import PassRouter from './routes/pass_routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app=express();
dotenv.config({path:'./config.env'});

//db
connectDB();

//middlewares
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
app.use(express.json());
app.use('/user',userRouter);
app.use('/password',PassRouter);

app.get('/',(req,res)=>{
    res.send(`Hello world app`);
});

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server up and running  at ${PORT}`);
});
