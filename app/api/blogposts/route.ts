import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

async function getBlogPosts(){
    return await prisma.blogPost.findMany({
        relationLoadStrategy:"join",
        include:{
            paragraph:true
        }
    });
}

export async function GET(){
    const blogs = await getBlogPosts();
    return NextResponse.json(blogs);
}