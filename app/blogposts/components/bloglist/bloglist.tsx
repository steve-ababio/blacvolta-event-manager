"use client"
import React from "react";
import {FcKindle } from "react-icons/fc";
import BlogTable from "../blogtable/blogtable";
import useSWR from "swr";


export type ParagraphType = {
    id:string
    imagepath:string,
    title:string,
    body:string,
    blogID:number
}
export type BlogPostType = {
    id: number;
    author: string;
    title: string;
    date: string;
    imagepath:string,
    paragraph:ParagraphType[]
}

const fetcher = (url:string)=>fetch(url,{cache:"no-store"}).then(res => res.json());
export default function BlogList(){
    const {data,isValidating} = useSWR("/api/bloglist",fetcher,
    {
        refreshWhenHidden:true,
        revalidateOnMount:true,        
        refreshWhenOffline:false
    });

    const blogs:BlogPostType[] = data;
    return(
        <>
            {
                 isValidating ? 
                    <div className="
                        h-full w-full flex text-slate-600
                        dark:text-white text-[20px] font-semi-bold
                        justify-center items-center"
                    >
                        Loading blogs
                    </div>
                :
                (
                    data.length === 0 ?
                    <div className="
                        dark:bg-darkprimary bg-white text-[30px]
                        dark:text-slate-200 text-slate-600
                        w-full flex-col-center h-full"
                    >
                        <FcKindle size={100} />
                        <p>There are no blog posts </p>
                    </div>
                    :
                    <div className=" mt-[3rem] max-w-[70rem] w-[95%] mx-auto h-full">
                        <BlogTable data={blogs} />
                    </div>
                )
            }
        </>
    )
}