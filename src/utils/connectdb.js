import mongoose from "mongoose";

// creating a function to connect our db
const connectdb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL).then((res)=>console.log("dbconnected successfully !!!"))
    } catch (error) {
        throw new Error("something is wrong with your connections")
    }
}
export default connectdb