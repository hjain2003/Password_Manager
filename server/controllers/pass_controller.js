import mongoose from "mongoose";
import Password from "../models/Password.js";
import User from "../models/User.js";


//myPasswords
export const getMyPasswords = async (req, res) => {
  try {
    const userId = req.query.userId;

    console.log(userId);
    const posts = await Password.find({ user: userId });

    if (posts) {
      res.status(200).json({ posts });
    } else {
      res.status(500).json({ error: 'Unexpected error' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Unexpected error' });
  }
};

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

//getPassByID
export const getPassById = async (req, res) => {
  const id = req.params.id; //get id from url

  let pass_details;
  try {
    pass_details = await Password.findById(id); //id we are getting from the url
    if (pass_details) {
      res.status(201).json({ pass_details });
    }
    else {
      res.status(422).json({ message: "pass not found" });
    }

  } catch (error) {
    return console.log(error);
  }
};

export const getAdditionalInfo = async (req, res) => {
  try {
    const id = req.params.id

    const password = await Password.findById(id);

    if (!password) {
      return res.status(404).json({ error: 'Password not found' });
    }

    return res.status(200).json({ additionalinfo: password.additionalinfo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

//deletePass
export const deletePass = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedPass = await Password.findByIdAndDelete(id);
    if (deletedPass) {
      const userId = deletedPass.user;
      const user = await User.findById(userId);
      if (user) {
        user.passwords.pull(id);
        await user.save();
      }
      res.status(200).json({ message: 'Password deleted successfully' });
    } else {
      res.status(404).json({ error: 'Password not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Unexpected error' });
  }
};




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