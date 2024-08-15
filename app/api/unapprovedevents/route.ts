import {  IEvent } from "@/app/constants/constants";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    let results:IEvent[];
    try{
         results = await prisma.event.findMany({
            where:{
                approved:false,
            }
        });
        console.log("Results: " + results);
    }catch(error){
        return NextResponse.json({message:"Internal server error"});
    }
    return NextResponse.json(results)
}