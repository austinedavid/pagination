"use client"
import React,{useEffect, useState} from 'react'
import styles from "./get.module.css"
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"

// here, we run the function that gets all the post
const getposts = async()=>{
    const response = await fetch("/api/post");
    const res = await response.json();
    return res
}
// here we run the delete functionality
const rundelete = async(id)=>{
    const response = await fetch(`/api/post/${id}`, {
        method: "DELETE"
    })
}

// here we run our component
const Getpost = () => {
    const queryclient = useQueryClient()
    
    // we are fetching our post here
    const{data, isLoading} = useQuery({
        queryKey: ["posts"],
        queryFn: ()=>getposts()
    })
   
    // we are deleting our post here
    const mutation = useMutation({
        mutationFn: (id)=>rundelete(id),
        onSuccess: ()=>{
            queryclient.invalidateQueries({queryKey: ["posts"]})
        }
    })
    const  handleDelete = (id)=>{
        mutation.mutate(id)
    }
    // if it is loading return 
    if(isLoading)return <div className={styles.container}>loading...</div>
    if(!data) return <div className={styles.container}>your posts will appear here</div>
  return (
    <div className={styles.container}>
        {data?.map((post)=>(
            <div key={post._id} className={styles.subcon}>
                <div>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
                </div>
                <div>
                <button onClick={()=>handleDelete(post._id)} className={styles.btn}>delete</button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Getpost