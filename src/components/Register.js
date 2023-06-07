"use client"
import React from 'react'
import {useMutation} from "@tanstack/react-query";
import { signIn, useSession } from 'next-auth/react';

// this function runs to register a new user
const regUsers = async(formData)=>{
    const response = await fetch('/api/auth/register', {
        method: "POST",
        body: JSON.stringify(formData)
    });
    const res = await response.json()
    return res
}

const Register = () => {
    const {data:session} = useSession()
    console.log(session)
    // here, we handle our userMutation functions
    const mutation = useMutation({mutationFn: (allValues)=>regUsers(allValues)})
    // here, er handle form submit
    const handleFormSubmit = (e)=>{
        e.preventDefault()
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const image = e.target[3].value;
        // convert is to one object
        const allValues = {name,email,password}

        // here, we make use of react query to register the user
        mutation.mutate(allValues)
        
    }
  return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <input placeholder='enter username'/>
            <input placeholder='enter email'/>
            <input placeholder='enter password'/>
            <input placeholder='enter image'/>
            <button>submit application</button>
        </form>
        <div>
            <button onClick={()=>signIn()}>login with google</button>
        </div>
    </div>
  )
}

export default Register