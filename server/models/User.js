import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    passkey: {
        type: String,
        required: true
    },
    cpasskey:{
        type: String,
        required: true
    },
    passwords:[{
        type : mongoose.Types.ObjectId,
        ref: "Password"
    }],
    
    tokens : [
        {
            token:{
                type:String,
                required :true
            }
        }
    ],
    otp:{
        type: String,
    },
});


userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token : token});
        await this.save();
        // console.log(token);
        return token;
    }catch(err){
        console.log(err);
    }
}



export default model("User", userSchema);
//users