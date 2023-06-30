import express from "express";
import { callUserDetails, login, logout, signup, verifyOTP } from "../controllers/user_controller.js";
import { Authenticate } from "../middleware/auth.js";
import { otpVerificationMiddleware } from "../middleware/otpverify.js";

const userRouter =express.Router();

userRouter.post('/register',signup);
userRouter.post('/login',login)
userRouter.post('/verifyotp',Authenticate,verifyOTP);
userRouter.get('/logout',logout);
userRouter.get('/getUserData',Authenticate,otpVerificationMiddleware,callUserDetails);

export default userRouter;