import mongoose from "mongoose";
import Password from "../models/Password.js";
import User from "../models/User.js";

//setPassword
export const setPassword = async (req, res) => {
  const { title, pass, additionalinfo, user } = req.body;
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

      //create session to save pass in both collections
      const session = await mongoose.startSession(); //starts a session
      session.startTransaction();

      existingUser.passwords.push(passwordset); //pushing to passwords array in user schema
      await existingUser.save({ session }); //saving user
      const passAdd = await passwordset.save({ session }); //saving password
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

//deletePass
export const deletePass = async (req, res) => {
  const id = req.params.id;

  let pass;
  try {

    const session = await mongoose.startSession();
    session.startTransaction();

    pass = await Password.findById(id).populate("user");
    pass.user.passwords.pull(pass);
    await pass.user.save({ session });
    pass = await Password.findByIdAndRemove(id);
    session.commitTransaction();

    if (pass) {
      res.status(201).json({ message: "password deleted successfully" });
    }
    else {
      res.status(422).json({ message: "unable to delete password" });
    }

  } catch (error) {
    return console.log(error);
  }
}

//editPass
export const updatePass = async (req, res) => {
  const id = req.params.id;
  const { title, pass, additionalinfo} = req.body;
  if (!title || !pass) {
    res.status(422).json({ error: "fields empty" });
  }


  try {
    const passwd_details = await Password.findByIdAndUpdate(id, {
      title, pass, additionalinfo
    });
    //no need to call save...save already called

    if (passwd_details) {
      res.status(201).json({ message: "password details updated successfully" });
    }
    else {
      res.status(422).json({ message: "unable to update pwd details" });
    }

  } catch (err) {
    console.log(err);
  }
};