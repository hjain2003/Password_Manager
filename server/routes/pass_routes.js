import express from "express";
import { setPassword } from "../controllers/pass_controller.js";
import { Authenticate } from "../middleware/auth.js";

const PassRouter = express.Router();

PassRouter.post('/setpassword',Authenticate,setPassword);

export default PassRouter;