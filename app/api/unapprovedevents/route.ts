import { IEventDetails } from "@/app/constants/constants";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function  GET(){
    let results:IEventDetails[];
    try{
         results = await prisma.event.findMany({
            where:{
                approved:false,
            }
        });
    }catch(error){
        return NextResponse.json({message:"Internal server error"});
    }
    return NextResponse.json(results)
}