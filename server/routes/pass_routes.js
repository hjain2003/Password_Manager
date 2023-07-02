import express from "express";
import { deletePass, getAdditionalInfo, getMyPasswords, getPassById, setPassword, updatePass } from "../controllers/pass_controller.js";
import { Authenticate } from "../middleware/auth.js";
import { otpVerificationMiddleware } from "../middleware/otpverify.js";

const PassRouter = express.Router();

PassRouter.get('/myPasswords',Authenticate,otpVerificationMiddleware,getMyPasswords);
PassRouter.post('/setpassword',Authenticate,otpVerificationMiddleware,setPassword);
PassRouter.get('/getPassbyId/:id',getPassById);
PassRouter.get('/additionalInfo/:id', Authenticate, otpVerificationMiddleware,getAdditionalInfo);
PassRouter.delete('/:id',deletePass);
PassRouter.put('/updatePass/:id', updatePass);


export default PassRouter;