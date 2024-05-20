import { prisma } from "@/app/lib/prisma";
import { uploadImage } from "@/app/utils/util";
import { NextResponse} from "next/server";

export async function PUT(req:Request){
    const data = await req.formData();
    const Id = data.get('Id') as string;
    const Description = data.get("eventdescription") as string;
    const EventDate = data.get("eventdate") as string || "";
    const EventTime = data.get("eventtime") as string;
    const EventName = data.get("eventname") as string;
    const Venue = data.get("eventvenue") as string;
    const TicketLinks = data.get("ticketlinks") as string;
    const SocialLinks = data.get("sociallinks") as string;
    const InquiryNumber = data.get("inquirynumber") as string;
    const image = data.get("eventflyer") as File|string;
    const DayofWeek = data.get("dayofweek") as string;
    const IsEventWeeklyString = data.get("iseventweekly");
    const IsEventWeekly = JSON.parse(IsEventWeeklyString as string);

    try{
        let imageurl = "";
        if(typeof image === "string"){
            imageurl = image;
        }
        if(image instanceof File){
            imageurl = await uploadImage(image);
        }
        await prisma.event.update({
            where:{
                Id
            },
            data:{
                FlyerImagePath:imageurl,
                Description,
                EventDate,
                EventName,
                EventTime,
                Venue,
                TicketLinks,
                SocialLinks,
                InquiryNumber,
                DayofWeek,
                IsEventWeekly,
            }
        });
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: "Image upload failed", status: 500 });
    }
    return NextResponse.json({message:"Event editted successfully"});
}
