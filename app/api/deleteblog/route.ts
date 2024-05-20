import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,){
    const {searchParams} = new URL(req.url);
    const id = searchParams.get("id") as string;
    const imageurl = searchParams.get("imageurl") as string;
    await prisma.blogPost.delete({
        where:{
            id:parseInt(id,10)
        },
    });
    // const imageblobdeletion = del(imageurl);
    // await Promise.all([dbdeletion]);
    return NextResponse.json({message:"Blog has been successfully deleted"})
}