import express from "express";
import { deletePass, setPassword, updatePass } from "../controllers/pass_controller.js";
import { Authenticate } from "../middleware/auth.js";
import { otpVerificationMiddleware } from "../middleware/otpverify.js";

const PassRouter = express.Router();

PassRouter.post('/setpassword',Authenticate,otpVerificationMiddleware,setPassword);
PassRouter.put('/delete/:id',Authenticate,otpVerificationMiddleware,deletePass);
PassRouter.put('/update/:id',Authenticate,otpVerificationMiddleware,updatePass);

export default PassRouter;