import { prisma } from "@/app/lib/prisma";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req:Request){
    
    const data = await req.formData();
    const Description = data.get("eventdescription") as string;
    const EventDate = data.get("eventdate") as string;
    const EventTime = data.get("eventtime") as string;
    const EventName = data.get("eventname") as string;
    const Venue = data.get("venue") as string;
    const TicketLinks = data.get("ticketlinks") as string;
    const SocialLinks = data.get("sociallinks") as string;
    const InquiryNumber = data.get("inquirynumber") as string;
    const image = data.get("flyerimagepath") as File;

    const filename = image.name.replaceAll(" ","_");
    try{
        const buffer = Buffer.from(await image.arrayBuffer())
        const imagepath = path.join(process.cwd(),`/public/uploads/${filename}`);
        await writeFile(imagepath,buffer);
        
        await prisma.event.create({
            data:{
                FlyerImagePath:`/uploads/${filename}`,
                Description,
                EventDate,
                EventName,
                EventTime,
                Venue,
                TicketLinks,
                SocialLinks,
                InquiryNumber
            }
        });
    }catch(error){
        return NextResponse.json({ message: "Image upload failed", status: 500 });
    }
    return NextResponse.json({ message: "Event editted successfully", status: 500 });
}