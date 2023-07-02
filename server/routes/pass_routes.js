import express from "express";
import { deletePass, getAdditionalInfo, getMyPasswords, setPassword, updatePass } from "../controllers/pass_controller.js";
import { Authenticate } from "../middleware/auth.js";
import { otpVerificationMiddleware } from "../middleware/otpverify.js";

const PassRouter = express.Router();

PassRouter.get('/myPasswords',Authenticate,otpVerificationMiddleware,getMyPasswords);
PassRouter.post('/setpassword',Authenticate,otpVerificationMiddleware,setPassword);
PassRouter.delete('/delete/:id',Authenticate,otpVerificationMiddleware,deletePass);
PassRouter.put('/update/:id',Authenticate,otpVerificationMiddleware,updatePass);
PassRouter.get('/additionalInfo/:id', Authenticate, otpVerificationMiddleware,getAdditionalInfo);

export default PassRouter;