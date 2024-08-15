import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function rejectEvent(eventId:string){
    return await prisma.event.delete({
        where:{
            Id:eventId,
        },
    });
}
export async function DELETE(req:NextRequest,){
    try{
        const {eventId} = await req.json();
        const result = await rejectEvent(eventId)
    }catch(error){
        return NextResponse.json({ message: "Internal server error",});
    }
    return NextResponse.json({message:"Event has been rejected",rejected:true})
}