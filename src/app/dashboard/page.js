import React from 'react'
import {getServerSession} from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {redirect} from "next/navigation"
import Logoutbtn from '@/components/Logoutbtn'
import Nav from '@/components/Nav'
import Getpost from '@/components/Getpost'
import Createpost from '@/components/Createpost'
import styles from "./dashboard.module.css"
const Dashboard = async() => {
    const session = await getServerSession(authOptions);
    if(!session?.user) return redirect('/login')
    console.log(session.user)
  return (
    <div>
        <Nav/>
        <Logoutbtn/>
        <div className={styles.posts}>
          <Getpost/>
          <Createpost/>
        </div>
    </div>
  )
}

export default Dashboard