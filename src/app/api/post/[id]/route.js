import connectdb from "@/utils/connectdb";
import postModel from "@/utils/postModel";
import { getToken } from "next-auth/jwt"
// here we run our delete functions
export async function DELETE(req,{params}){
    
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    if(!token) throw new Error("you are not authenticated")
    await connectdb();
    try {
        const deletedPost = await postModel.findByIdAndDelete(params.id)
        return new Response(JSON.stringify({message: "deleted succesfully"}), {status: 200}) 
    } catch (error) {
        throw new Error(error)
    }
}
