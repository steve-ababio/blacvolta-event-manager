import { prisma } from "@/app/lib/prisma";
import { put } from "@vercel/blob";
import { NextResponse} from "next/server";

export async function PUT(req:Request,res:NextResponse){

    const data = await req.formData();
    console.log(data);
    const Id = data.get('Id') as string;
    const Description = data.get("eventdescription") as string;
    const EventDate = data.get("eventdate") as string;
    const EventTime = data.get("eventtime") as string;
    const EventName = data.get("eventname") as string;
    const Venue = data.get("venue") as string;
    const TicketLinks = data.get("ticketlinks") as string;
    const SocialLinks = data.get("sociallinks") as string;
    const InquiryNumber = data.get("inquirynumber") as string;
    const image = data.get("flyerimagepath") as File|string;

    try{
        let filename = image;
        if(image instanceof File){
            const buffer = Buffer.from(await image.arrayBuffer())
            filename = image.name.replaceAll(" ","_");
            // 
            const blob = await put(filename,buffer, {
                access: 'public',
            });
        }
        await prisma.event.update({
            where:{
                Id
            },
            data:{
                FlyerImagePath:`${filename}`,
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
        console.log("Image upload failed", error);
        return NextResponse.json({ message: "Image upload failed", status: 500 });
    }
    return NextResponse.json({message:"Event editted successfully"});
}