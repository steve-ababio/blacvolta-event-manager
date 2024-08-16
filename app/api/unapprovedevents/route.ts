import {  IEvent } from "@/app/constants/constants";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,res:NextResponse){
    console.log("getting unapproved events")
    let results:IEvent[];
    try{
         results = await prisma.event.findMany({
            where:{
                approved:false,
            }
        });
        console.log("results:",results);
    }catch(error){
        return NextResponse.json({message:"Internal server error"});
    }
    return NextResponse.json(results)
}