import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function approveEvent(eventId:string){
    return await prisma.event.update({
        where:{
            Id:eventId,
        },
        data:{
            approved:true
        }
    });
}
export async function PUT(req:NextRequest){
    try{
        const {email,name,eventId,Id} = await req.json();
        await approveEvent(Id);
        const body = {
            name,
            eventId,
            email,
            link:"https://paystack.com/pay/anthers",
            subject: "Your event has been Approved!",
            text: "Follow the link below to complete payment and have your event published."
        }
        const response = await fetch("https://mail.blacvolta.com/send.php",{body:JSON.stringify(body),method:"POST",headers:{"Content-Type":"application/json"}});
        const data = await response.json();
    }catch(error){
        console.log(error)
        return NextResponse.json({ message:"Internal server error",});
    }
    return NextResponse.json({approved:true,message:"Event has been approved"});
}