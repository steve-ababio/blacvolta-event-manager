"use client"
import { IEventDetails } from "@/app/constants/constants";
import Table from "@/app/dashboard/components/table/table";
import { prisma } from "@/app/lib/prisma";
import { FcCalendar } from "react-icons/fc";

async function getApprovedEvents(){
    const results = await prisma.event.findMany({
        where:{
            approved:true,
            paid:true,
        }
    });
    return results;
}
export default async function EventList(){
    const data = await getApprovedEvents();
    const events:IEventDetails[] = data!;
    console.log("events: ",events);
    
    return(
        <>
            {
                (
                    events.length === 0 ?
                        <div className="
                            dark:bg-darkprimary bg-white text-[30px]
                            dark:text-slate-200 text-slate-600
                            w-full flex-col-center h-full"
                        >
                            <FcCalendar size={100} />
                            <p>There are no events </p>
                        </div>
                        :
                        <div className=" mt-[3rem] max-w-[70rem] w-[95%] mx-auto h-full">
                            <Table data={events} />
                        </div>
                )
            }
        </>
    )
}