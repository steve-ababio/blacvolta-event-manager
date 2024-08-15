import { IEvent } from "@/app/constants/constants";
import { prisma } from "@/app/lib/prisma";
import { uploadImage } from "@/app/utils/util";
import { NextResponse } from "next/server";


type TEvent = Omit<IEvent,"Id">;
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
    const timeframestring = data.get("eventtimeframe") as string;
    const IsEventWeekly = JSON.parse(IsEventWeeklyString as string) as boolean;

    const timeframe = parseInt(timeframestring,10);
    let dates = [];
    let initialdate = EventDate;

    for(let i = 0; i < timeframe; i++){
        let[year,month,day] = initialdate.split("-");
        let nextday = parseInt(day,10) + i;
        let nextdaystring = nextday.toString();
        if(nextday < 10){
            nextdaystring = `0${nextdaystring}`
        }
        const nextdate = `${year}-${month}-${nextdaystring}`;
        dates.push(nextdate);
    }
    try{
        const imageurl = await uploadImage(image);
        const events:TEvent[] = [];
        dates.forEach((EventDate)=>{
            events.push(
                {
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
            )
        });
        await prisma.event.createMany({
            data:events
        });
        // await prisma.event.create({
        //     data:{
        //         adminUserId,
        //         FlyerImagePath:imageurl,
        //         Description,
        //         EventDate,
        //         EventName,
        //         EventTime,
        //         Venue,
        //         TicketLinks,
        //         SocialLinks,
        //         InquiryNumber,
        //         IsEventWeekly,
        //         DayofWeek,
        //         approved:true,
        //         paid:true,
        //     }
        // });
    }catch(error){
        console.log(error);
        // return NextResponse.json({ message: "Image upload failed", status: 500 });
    }
    return NextResponse.json({ message: "Event created successfully", });
}
