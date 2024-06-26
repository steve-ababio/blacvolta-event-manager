import { prisma } from "@/app/lib/prisma";
import { uploadImage } from "@/app/utils/util";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const data = await req.formData();
    const Description = data.get("eventdescription") as string;
    let EventDate = data.get("eventdate") as string || "";
    const EventTime = data.get("eventtime") as string;
    const EventName = data.get("eventname") as string;
    const Venue = data.get("eventvenue") as string;
    const TicketLinks = data.get("ticketlinks") as string;
    const SocialLinks = data.get("sociallinks") as string;
    const InquiryNumber = data.get("inquirynumber") as string;
    const IsEventWeeklyString = data.get("iseventweekly");
    const image = data.get("eventflyer") as File;
    const DayofWeek = data.get("dayofweek") as string;
    const adminUserId = data.get("adminUserId") as string;
    const IsEventWeekly = JSON.parse(IsEventWeeklyString as string) as boolean;
    
    try{
        const imageurl = await uploadImage(image);
        await prisma.event.create({
            data:{
                adminUserId,
                FlyerImagePath:imageurl,
                Description,
                EventDate,
                EventName,
                EventTime,
                Venue,
                TicketLinks,
                SocialLinks,
                InquiryNumber,
                IsEventWeekly,
                DayofWeek,
                approved:true,
                paid:true,
            }
        });
    }catch(error){
        console.log(error);
        // return NextResponse.json({ message: "Image upload failed", status: 500 });
    }
    return NextResponse.json({ message: "Event created successfully", });
}
