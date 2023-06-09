"use client"
import React from 'react'
import styles from "./create.module.css"
import {useMutation, useQueryClient} from "@tanstack/react-query"

// here, we will make use of fetch to post the article
const runmutation = async(formValue)=>{
    const result = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify(formValue)
    })
    return await result.json()
}

// our components
const Createpost = () => {
    const queryClient = useQueryClient()
    // initializing our mutation functions
    const mutation = useMutation({
        mutationFn: (formValue)=>runmutation(formValue),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["posts"]})
        }
    })
    // handle the create functionality
    const handleSubmit = (e)=>{
        e.preventDefault();
        // getting the individual values
        const title = e.target[0].value;
        const body = e.target[1].value;
        // joining the two imput to form an object for uploads
        const formValue = {
            title,
            body
        }
        // here, we call the mutation function
        mutation.mutate(formValue)
        e.target.reset();
    }
  return (
    <div className={styles.container}>
        <p>create your post below</p>
        <form className={styles.form} onSubmit={handleSubmit}>
            <input placeholder='enter title'/>
            <textarea placeholder='enter article body'/>
            <button>create article!!!</button>
        </form>
    </div>
  )
}

export default Createpost