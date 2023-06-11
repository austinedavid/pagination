import { getToken } from "next-auth/jwt"
import connectdb from "@/utils/connectdb"
import postModel from "@/utils/postModel"

// here we will craete our post
// and only the authenticated users can create post
export async function POST(req){
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
    if(!token) return new Response(JSON.stringify({message:"you are not logged in, you can't make a post"}))
    // connect to the db
    await connectdb();
    const{title, body} = await req.json()
    // making use of try and catch to post the new post
    try {
        const newpost = new postModel({
            title,
            body,
            creator: token.sub,
        });
        const savedPost = await newpost.save()
        return new Response(JSON.stringify({message: "post successfully created"}), {status:200})
    } catch (error) {
        throw new Error("something went wrong, try again later please!!!")
    }
}


// here we get all our.
// and only the authenticated users can fetch their post.
// and only their post will be returned to them.
export async function GET(req){
    // const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
    // connecting to ourdb
    await connectdb()
    // if(!token) return new Response(JSON.stringify({message: "you are not authorized to get this post"}), {status:401})
    // then if the user is authenticated, then run the following code
    try {
        const usersPost = (await postModel.find()).sort((a,b)=>b.createdAt - a.createdAt)
        return new Response(JSON.stringify(usersPost), {status:200, statusText:"successfully fetched"})

    } catch (error) {
        throw new Error("something went wrong, try again later")
    }
    
}

// here, we will create a delete functionality for our post.