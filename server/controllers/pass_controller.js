import mongoose from "mongoose";
import Password from "../models/Password.js";
import User from "../models/User.js";

//setPassword
export const setPassword = async (req, res) => {
    const { title, pass, additionalinfo, user} = req.body;
    if (!title || !pass) {
      res.status(422).json({ error: "fields empty" });
    }
  
    // Get the user ID from the authenticated user
    const userId = req.rootUser._id;
  
    try {
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        res.status(422).json({ message: "user not found" });
      } else {
        const passwordset = new Password({
          title,
          pass,
          additionalinfo,
          user: userId
        });
  
        //create session to save post in both collections
        const session = await mongoose.startSession(); //starts a session
        session.startTransaction();
  
        existingUser.passwords.push(passwordset); //pushing to posts array in user schema
        await existingUser.save({ session }); //saving user
        const passAdd = await passwordset.save({ session }); //saving post
        session.commitTransaction(); //finishing transaction
        if (passAdd) {
          res.status(201).json({ message: "pass added successfully" });
        } else {
          res.status(422).json({ message: "pass not added" });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Unexpected error" });
    }
  };