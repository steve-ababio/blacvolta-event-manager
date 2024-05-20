import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function rejectEvent(eventId:string){
    return prisma.event.delete({
        where:{
            Id:eventId,
        },
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
export async function DELETE(req:NextRequest,){
    try{
        const {userId,eventId} = await req.json();
        const result = await Promise.all([rejectEvent(eventId),getUserContact(userId)]);
        const [_,usercontact] = result;
        if(usercontact){
            const{email,phonenumber} = usercontact;
            //dispatch sms or e-mail.
        }

    }catch(error){
        return NextResponse.json({ message: "Internal server error",});
    }
    return NextResponse.json({message:"Event has been rejected",rejected:true})
}