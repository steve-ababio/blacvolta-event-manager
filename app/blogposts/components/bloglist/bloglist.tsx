"use client"
import React from "react";
import {FcKindle } from "react-icons/fc";
import BlogTable from "../blogtable/blogtable";
import useSWR from "swr";
import { prisma } from "@/app/lib/prisma";


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
async function getBlogPosts(){
    return await prisma.blogPost.findMany({
        relationLoadStrategy:"join",
        include:{
            paragraph:true
        }
    });
}

export default async function BlogList(){
    const data = await getBlogPosts();
    const blogs:BlogPostType[] = data;
    return(
        <>
            {
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