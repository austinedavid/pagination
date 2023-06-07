import mongoose from "mongoose";


// creating the users schema here
const userSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
    },
    image:{
        type:String
    }
}, {timestamps:true})

// here, we export our users schema
export default mongoose.models.USER || mongoose.model("USER", userSchema)