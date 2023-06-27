import express from "express";
import { login, signup, verifyOTP } from "../controllers/user_controller.js";

const userRouter =express.Router();

userRouter.post('/register',signup);
userRouter.post('/login',login)
userRouter.post('/verifyotp',verifyOTP);

export default userRouter;