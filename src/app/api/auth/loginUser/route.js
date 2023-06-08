import connectdb from "@/utils/connectdb";
import userModel from "@/utils/userModel";
import bcrypt from "bcryptjs"

// here, we create a post request for users that wants to login.
export const POST = async(req)=>{
    const{email, password}= await req.json()
    // making use of try and catch to catch any possible error
    console.log(password, email)
    try {
        await connectdb();
        // lets get the user from the database
        const user = await userModel.findOne({email})
        if(!user) return new Response(JSON.stringify({message: "this users is not registered"}), {status: 401});
        const comparedPassword = bcrypt.compareSync(password, user.password);
        console.log(comparedPassword)
        if(!comparedPassword) return new Response(JSON.stringify({message: "your password does not match, try again"}), {status: 401});
        return new Response(JSON.stringify(user), {status: 200})
    } catch (error) {
        throw new Error(error)
    }
}