import User from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import pkg from 'bcryptjs';
const { hashSync } = pkg;
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({path:'./config.env'});


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'harshjainn2003@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
});



//registration
export const signup = async (req, res) => {
  const { name, email, passkey, cpasskey } = req.body;

  if (!name || !email || !passkey) {
    return res.status(422).json({ error: "empty fields!" });
  }
  if (passkey !== cpasskey) {
    return res.status(422).json({ error: "passkey and the confirm passkey fields do not match!" });
  }

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ error: "Email already exists!" });
    }

    const hashedPasskey = pkg.hashSync(passkey);
    const hashedcPasskey = pkg.hashSync(cpasskey);
    const user = new User({ name,email, passkey: hashedPasskey, cpasskey: hashedcPasskey });
    const userRegister = await user.save();

    if (userRegister) {
      res.status(201).json({ message: "user registered successfully!" });
    } else {
      res.status(422).json({ error: "Registration failed" });
    }
  } catch (err) {
    console.log(err);
  }
};


//otpGenerator
const generateOTP = () => {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};


//loginuser
export const login = async (req, res) => {
  try {
    const { name, passkey } = req.body;

    if (!passkey || !name) {
      res.status(400).json({ message: "fields empty!" });
    }

    const userLogin = await User.findOne({ name: name }) //has entire document

    if (userLogin) {
      const isMatch = await bcrypt.compare(passkey, userLogin.passkey);

      if (isMatch) {
        const otp = generateOTP();

        const mailOptions = {
          from: 'harshjainn2003@gmail.com',
          to: userLogin.email,
          subject: 'OTP Verification',
          text: `Your OTP is: ${otp}`,
        };

        transporter.sendMail(mailOptions, async(error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            // Store the OTP in the database or session for verification
            userLogin.otp = otp;
            await userLogin.save();
          }
        });

        console.log(userLogin);

        const token = await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true
        });
        res.cookie("test", 'val');
        res.status(201).json({ message: "otp to email sent!", userId: userLogin._id });
      }
      else {
        res.status(400).json({ message: "pwd incorrect!" });
      }
    }
    else {
      return res.status(400).json({ message: "user does not exist !" });
    }

  } catch (err) {
    console.log(err);
  }
}

//verifyOtp
export const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    // Compare the OTP entered by the user with the stored OTP
    if (user.otp === otp) {
      // OTP is verified
      // Clear the OTP from the database or session
      user.otp = undefined;
      await user.save();

      // Generate a new token or use the existing one
      const token = await user.generateAuthToken();

      // Send the token in the response
      res.status(200).json({ message: 'OTP verified!', token });
    } else {
      // Invalid OTP
      res.status(400).json({ message: 'Invalid OTP!' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



