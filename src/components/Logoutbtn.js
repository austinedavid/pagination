"use client"
import React from 'react'
import {signOut, useSession} from "next-auth/react"

const Logoutbtn = () => {
  const {data:session} = useSession();
  return (
    <div>
        <p style={{color: "tomato"}}>welcome to GmodeTech: @{session?.user?.email}</p>
        <button style={{backgroundColor: "red", color: "white", padding: "purple", border: "0px"}} onClick={()=>signOut()}>signout</button>
    </div>
  )
}

export default Logoutbtn