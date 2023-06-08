"use client"
import React from 'react'
import {useMutation} from "@tanstack/react-query";
import { signIn, useSession } from 'next-auth/react';
import styles from "./register.module.css"
import {useRouter} from "next/navigation"
import Link from 'next/link';

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
    const router = useRouter()
    const {data:session} = useSession()
    console.log(session)
    // here, we handle our userMutation functions
    const mutation = useMutation({mutationFn: (allValues)=>regUsers(allValues),
    onSuccess: async()=> router.push('/login'),
    onError: async()=> alert("check your details and try again...")
    })
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
    <div className={styles.container}>
        <div className={styles.subcon}>
            <h4 className={styles.heading}>welcome to gmodeTech</h4>
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <input placeholder='enter username'/>
            <input placeholder='enter email'/>
            <input placeholder='enter password'/>
            <input placeholder='enter image'/>
            <button className={styles.regBtn}>submit application</button>
        </form>
        <hr className={styles.line}/>
        <div>
            <button className={styles.google} onClick={()=>signIn("google")}>login with google</button>
            <p className={styles.small}>I already have an account <Link href="/login">signin</Link></p>
        </div>
        </div>
    </div>
  )
}

export default Register