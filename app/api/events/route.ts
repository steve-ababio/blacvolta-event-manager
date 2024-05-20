import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

async function getApprovedEvents(){
    try{
        const results = await prisma.event.findMany({
            where:{
                approved:true,
                paid:true,
                
            }
        });
        console.log("events:",results);
        return results;
    }catch(error){
        NextResponse.json(error);
    }
}

export async function GET(){
    const approvedevents = await getApprovedEvents();
    return NextResponse.json(approvedevents);
}