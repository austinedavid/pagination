"use client"
import React from 'react'
import {signIn, useSession} from "next-auth/react"
import {useRouter} from "next/navigation"
import styles from "./register.module.css"
import Link from "next/link"

const Login = () => {
    const router = useRouter()
    const {data:session, status} = useSession()
    // here, we will redirect the user back to the dashboard if they are registered
    if(status === "authenticated") return router.push('/dashboard')
    // here, we will handle form submission
    const handleFormSubmit = ()=>{

    }
  return (
    <div className={styles.container}>
        <div className={styles.subcon}>
            <h4 className={styles.heading}>welcome to gmodeTech</h4>
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <input placeholder='enter email'/>
            <input placeholder='enter password'/>
            <button className={styles.regBtn}>Login</button>
        </form>
        <hr className={styles.line}/>
        <div>
            <button className={styles.google} onClick={()=>signIn("google")}>login with google</button>
            <p className={styles.small}>I already have an account <Link href="/register">signin</Link></p>
        </div>
        </div>
    </div>
  )
}

export default Login