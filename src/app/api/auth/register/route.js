import connectdb from "@/utils/connectdb";
import userModel from "@/utils/userModel";
import bcrypt from "bcryptjs"

// here, we will make a post request to register our users
export const POST = async(req)=>{
// here we get all the imports
const{name, email, password, image} = await req.json()
// hashing the gotten password
const hashedPassword = await bcrypt.hash(password, 10);

// here, we make use of the try and catch to get the errors
try {
    await connectdb();
    // create the user into our database
    const user = new userModel({
        name,
        email,
        password:hashedPassword,
        image
    })
    // here, we save to the database
    const savedUser = await user.save();
    return new Response(JSON.stringify({message:"user creation successful"}), {status: 200})
} catch (error) {
    throw new Error("registration is invalid")
}
}