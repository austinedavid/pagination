import React from 'react'
import {getServerSession} from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const Dashboard = async() => {
    const session = await getServerSession(authOptions);

  return (
    <div>
        <p>name: {session?.user?.name}</p>
        <p>name: {session?.user?.email}</p>
    </div>
  )
}

export default Dashboard