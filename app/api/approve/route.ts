import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function approveEvent(eventId:string){
    return prisma.event.update({
        where:{
            Id:eventId,
        },
        data:{
            approved:true
        }
    });
}
function getUserContact(userId:string){
    return prisma.user.findUnique({
        where:{
            id:userId
        },
        select:{
            email:true,
            phonenumber:true
        }
    })
}
export async function POST(req:NextRequest){
    try{
        const {userId,eventId} = await req.json();
        const result = await Promise.all([approveEvent(eventId),getUserContact(userId)]);
        const [_,usercontact] = result;
        if(usercontact){
            const{email,phonenumber} = usercontact;
            //dispatch sms or e-mail.
        }

    }catch(error){
        return NextResponse.json({ message: "Internal server error",});
    }
    return NextResponse.json({approved:true,message:"Event has been approved"});
}