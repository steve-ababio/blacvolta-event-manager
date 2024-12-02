import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function hideEvent(eventId:string,status:boolean){
    return await prisma.event.update({
        where:{
            Id:eventId,
        },
        data:{
            hidden:status
        },
        select:{
            hidden:true,
            EventName:true,
        }
    });
}
export async function PUT(req:NextRequest){
    let hiddenstatus;
    let eventName:string = "";
    try{
        const {Id,hidden} = await req.json();
        const result = await hideEvent(Id,hidden);
        hiddenstatus = result.hidden;
        eventName = result.EventName;
        
    }catch(error){
        console.log(error);
        return NextResponse.json({success:false, message:"Internal server error",});
    }
    return NextResponse.json({success:true,message: hiddenstatus ?`Event ${eventName} has been hidden`:`Event ${eventName} is now visible `});
}