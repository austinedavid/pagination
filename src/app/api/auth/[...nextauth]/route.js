import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectdb from "@/utils/connectdb";
import userModel from "@/utils/userModel";
import bcrypt from "bcryptjs"

export const authOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await connectdb()
                // getting the user by email
                const user = await userModel.findOne({email:credentials.email})
                if(!user) return 
                const comparedpassword = bcrypt.compareSync(credentials.password, user.password)
                if(!comparedpassword) return
              if (user) {
                return user
              } else {
                return null
              }
            }
          })
         
      ],
      secret:process.env.NEXTAUTH_SECRET,
      session:{
        strategy: "jwt",
      },
      pages:{
        error: "/login"
      },
      callbacks:{
        async jwt({ token, user, account, profile, isNewUser }) {
           
            return token
          }
      }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }