import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const data = await req.formData();
    const username = data.get("username") as string;
    const currentpassword = data.get("currentpassword") as string;
    let matched = false;
    try{
        const result = await prisma.adminUser.findUnique({
            where:{
                username
            },
            select:{
                password:true
            }
        });
        if(currentpassword === result?.password){
            matched = true;
        }
    }catch(error){
        return NextResponse.json({error});
    }
    return NextResponse.json({matched});
}