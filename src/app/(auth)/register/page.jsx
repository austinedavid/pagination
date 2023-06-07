import Register from '@/components/Register'
import React from 'react'
import {getServerSession} from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {redirect} from "next/navigation"

const Registernow = async() => {
  // lets get the users 
  const session = await getServerSession(authOptions)
  if(session?.user) return redirect('/dashboard')
  
  return (
    <div>
      <Register/>
    </div>
  )
}

export default Registernow