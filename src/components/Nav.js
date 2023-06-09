"use client"
import React from 'react';
import {useSession} from "next-auth/react"
import styles from "./nav.module.css"


const Nav = () => {
    // here we get all our sessions
    const{data:session} = useSession()
  return (
    <div className={styles.mainCon}>
    <div className={styles.container}>
        <h4 className={styles.logo}>GmodeTech</h4>
        <div>
            <img src={session?.user?.image} className={styles.img}/>
        </div>
    </div>
    </div>
  )
}

export default Nav