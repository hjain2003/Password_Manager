import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";

const passwordSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    pass:{
        type: String,
        required: true
    },
    user :{
        type : mongoose.Types.ObjectId,
        ref: "User",
    }
});


export default model("Password", passwordSchema);
//users