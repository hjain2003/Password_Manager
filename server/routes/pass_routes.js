import express from "express";
import { deletePass, setPassword } from "../controllers/pass_controller.js";
import { Authenticate } from "../middleware/auth.js";

const PassRouter = express.Router();

PassRouter.post('/setpassword',Authenticate,setPassword);
PassRouter.put('/:id',deletePass)

export default PassRouter;