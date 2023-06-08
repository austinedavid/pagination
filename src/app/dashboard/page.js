import React from 'react'
import {getServerSession} from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {redirect} from "next/navigation"
import Logoutbtn from '@/components/Logoutbtn'

const Dashboard = async() => {
    const session = await getServerSession(authOptions);
    if(!session?.user) return redirect('/login')
    console.log(session.user.image)
  return (
    <div>
        <p>name: {session?.user?.name}</p>
        <p>name: {session?.user?.email}</p>
        <img src={session?.user.image} style={{width: "30px", height: "30px", borderRadius: "50%"}}/>
        <Logoutbtn/>
    </div>
  )
}

export default Dashboard