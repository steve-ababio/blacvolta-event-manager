import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,){
    const {searchParams} = new URL(req.url);
    const Id = searchParams.get("id") as string;
    
    await prisma.event.delete({
        where:{
            Id
        }
    });
    return NextResponse.json({message:"Event has been successfully deleted"})
}