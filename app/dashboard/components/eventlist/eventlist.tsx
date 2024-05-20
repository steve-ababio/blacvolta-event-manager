"use client"
import { IEventDetails } from "@/app/constants/constants";
import Table from "@/app/dashboard/components/table/table";
import { FcCalendar } from "react-icons/fc";
import useSWR from "swr";


const fetcher = ([url]:string[])=>fetch(url).then(res => res.json());
export default function EventList(){
    const {data,isValidating} = useSWR(["/api/events"],fetcher)
    const events:IEventDetails[] = data;
    console.log("events: ",events);
    
    return(
        <>
            {
                isValidating ? 
                    <div className="
                        h-full w-full flex justify-center
                        items-center text-slate-600
                        dark:text-white text-[20px]"
                    >
                        Loading events
                    </div>
                :
                (
                    data.length === 0 ?
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