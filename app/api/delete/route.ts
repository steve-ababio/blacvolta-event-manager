import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";

export async function DELETE(req:NextRequest,){
    const {searchParams} = new URL(req.url);
    const Id = searchParams.get("id") as string;
    const imageurl = searchParams.get("imageurl") as string;

    const dbdeletion =  prisma.event.delete({
        where:{
            Id
        }
    });
    const imageblobdeletion = del(imageurl);
    await Promise.all([dbdeletion, imageblobdeletion]);
    return NextResponse.json({message:"Event has been successfully deleted"})
}