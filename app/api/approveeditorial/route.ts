import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function approveEditorial(blogId:number){
    return prisma.blogPost.update({
        where:{
            id:blogId,
        },
        data:{
            approved:true
        }
    });
}

export async function POST(req:NextRequest){
    try{
        const {editorialId} = await req.json();
        await approveEditorial(parseInt(editorialId,10));

    }catch(error){
        return NextResponse.json({ message: "Internal server error",});
    }
    return NextResponse.json({approved:true,message:"Editorial has been approved"});
}
export const revalidate = 0;