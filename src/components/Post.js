"use client"
import React,{useState} from 'react'
import {useQuery} from "@tanstack/react-query"


const getallPost = async(page)=>{
    const result = await fetch(`/api/pagination?page=${page}&limit=2`);
    return await result.json()
}
const Post = () => {
    // defining our state here
    const [page, setpage] = useState(1)
    const {data, isLoading} = useQuery({queryKey: ["post", page], queryFn:()=> getallPost(page),keepPreviousData : true})
   
    // creating a array to fix the total numbers of the pages
    const pagination = [];
    for(let i=1; i<=Math.ceil(data?.totalLenght/2); i++){
        pagination.push(i)
    }
    // here we increament the btn clicked
    const handleBtnClicked = (btn)=>{
        setpage(btn)
    }
    if(isLoading) return <div>loading ...</div>
  return (
    <div>
        {data?.valuetoReturn.map(post=>(
            <div key={post.id}>
                <p>{post.post}</p>
            </div>
        ))}
        {
            pagination.map((btn)=>(
                <button style={{backgroundColor: page == btn? "green": "white"}} onClick={()=>handleBtnClicked(btn)} key={btn}>{btn}</button>
            ))
        }
    </div>
  )
}

export default Post