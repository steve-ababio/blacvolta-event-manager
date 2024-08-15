import { IEditorial } from "@/app/constants/constants";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function  GET(){
    let results:IEditorial[];
    try{
         results = await prisma.blogPost.findMany({
            where:{
                approved:false
            },
            relationLoadStrategy:"join",
            include:{
                paragraph:true
            },
        });
    }catch(error){
        return NextResponse.json({message:"Internal server error"});
    }
    console.log("results:",results);
    return NextResponse.json(results)
}