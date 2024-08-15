import {  IEvent } from "@/app/constants/constants";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,res:NextResponse){
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
    res.headers.set("Cache-Control", "no-store");
    return NextResponse.json(results)
}