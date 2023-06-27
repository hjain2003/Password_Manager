import express from "express";
import { deletePass, setPassword, updatePass } from "../controllers/pass_controller.js";
import { Authenticate } from "../middleware/auth.js";

const PassRouter = express.Router();

PassRouter.post('/setpassword',Authenticate,setPassword);
PassRouter.put('/delete/:id',deletePass);
PassRouter.put('/update/:id',updatePass);

export default PassRouter;