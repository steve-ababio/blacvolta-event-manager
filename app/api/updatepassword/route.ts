import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req:Request){
    const data = await req.formData();
    const username = data.get("username") as string;
    const password = data.get("password") as string;

    try{
        await prisma.adminUser.update({
            data:{
                password
            },
            where:{username}
        });  
    }catch(err){
        return NextResponse.json({message: err});
    }
    return NextResponse.json({message:"password updated successfully"});
}