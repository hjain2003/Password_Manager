import User from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import pkg from 'bcryptjs';
const { hashSync } = pkg;

//registration
export const signup = async (req, res) => {
    const { name, phoneno, passkey ,cpasskey } = req.body;
  
    if (!name || !phoneno || !passkey) {
      return res.status(422).json({ error: "empty fields!" });
    }
    if(passkey!==cpasskey){
        return res.status(422).json({error : "passkey and the confirm passkey fields do not match!"});
    }
    
    try {
      const userExists = await User.findOne({ phoneno:phoneno });
      if (userExists) {
        return res.status(422).json({ error: "Email already exists!" });
      }

      const hashedPasskey = pkg.hashSync(passkey);
      const hashedcPasskey = pkg.hashSync(cpasskey);
      const user = new User({ name, phoneno , passkey : hashedPasskey, cpasskey:hashedcPasskey });
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

  //loginuser
  export const login = async(req, res)=>{
    try{
        const {name, passkey}=req.body;

        if(!passkey || !name){
            res.status(400).json({message:"fields empty!"});
        }

        const userLogin=await User.findOne({name: name}) //has entire document

        if(userLogin){
            const isMatch = await bcrypt.compare(passkey, userLogin.passkey);

            if(isMatch){
                console.log(userLogin);
                
                const token = await userLogin.generateAuthToken();
                console.log(token);
                res.cookie("jwtoken",token,{
                    expires : new Date(Date.now()+25892000000),
                    httpOnly:true
                });
                res.cookie("test",'val');
                res.status(201).json({message: "user successfully logged in!", userId : userLogin._id});
            }
            else{
                res.status(400).json({message:"pwd incorrect!"});
            }
        }
        else{
            return res.status(400).json({message : "user does not exist !"});
        }

    }catch(err){
        console.log(err);
    }
}
