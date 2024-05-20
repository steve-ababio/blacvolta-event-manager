import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req:Request){
    const data = await req.formData();
    const oldusername = data.get("oldusername") as string
    const newusername = data.get("newusername") as string;

    try{
        await prisma.adminUser.update({
            data:{
                username:newusername,
            },
            where:{username:oldusername},
        });  
    }catch(err){
        return NextResponse.json({message: err});
    }
    return NextResponse.json({message:"username updated successfully"});
}