import express from "express";
import { login, signup } from "../controllers/user_controller.js";

const userRouter =express.Router();

userRouter.post('/register',signup);
userRouter.post('/login',login)

export default userRouter;