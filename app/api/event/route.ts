import { prisma } from "@/app/lib/prisma";
import { uploadImage } from "@/app/utils/util";
import { NextResponse } from "next/server";

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

    try{
        const imageurl = await uploadImage(image);
        await prisma.event.create({
            data:{
                FlyerImagePath:imageurl,
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
    return NextResponse.json({ message: "Event added successfully", });
}