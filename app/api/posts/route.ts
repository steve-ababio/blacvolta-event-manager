import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const result = await prisma.blogPost.findMany({
        relationLoadStrategy:"join",
        include:{
            paragraph:true
        }
    });
    return NextResponse.json(result);
}