import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function rejectEditorial(blogId:number){
    return await prisma.blogPost.delete({
        where:{
            id:blogId,
        },
    });
}
export async function DELETE(req:NextRequest,){
    try{
        const {editorialId} = await req.json();
        console.log("blogid:",editorialId);
        const result = await rejectEditorial(parseInt(editorialId,10));
    }catch(error){
        console.log(error)
        return NextResponse.json({ message: "Internal server error",});
    }
    return NextResponse.json({message:"Editorial rejected",rejected:true})
}
export const revalidate = 0;