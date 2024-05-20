import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function getBlogPost(id:number){
    return await prisma.blogPost.findMany({
        where:{
            id:id
        },
        relationLoadStrategy:"join",
        include:{
            paragraph:true
        },
        orderBy:{
            id:"desc"
        },
    });
}
export  async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const Id = searchParams.get("id")!;
    const blog = await getBlogPost(parseInt(Id,10));
    return NextResponse.json(blog);
}