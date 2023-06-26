import express from "express";
import { setPassword } from "../controllers/pass_controller.js";

const PassRouter = express.Router();

PassRouter.post('/setpassword',setPassword);

export default PassRouter;