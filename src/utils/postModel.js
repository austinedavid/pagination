import mongoose from "mongoose";
const {Schema} = mongoose

// creating our post schema
const postSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    body:{
        type:String,
        required:true
    }
},{timestamps:true})

// here, we will export our post
export default mongoose.models.POSTS || mongoose.model("POSTS", postSchema)