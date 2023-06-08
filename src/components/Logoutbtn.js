"use client"
import React from 'react'
import {signOut} from "next-auth/react"

const Logoutbtn = () => {
  return (
    <div>
        <button onClick={()=>signOut()}>signout</button>
    </div>
  )
}

export default Logoutbtn