"use client"
import {IUserEventDetails } from "@/app/constants/constants"
import { GoInbox } from "react-icons/go"
import EventNotificationItem from "../notificationitem/eventnotificationitem"

interface UnApprovedEventsProps {
    events:IUserEventDetails[],
    fetchLatestEvents:()=>void,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedEvent:React.Dispatch<React.SetStateAction<IUserEventDetails|undefined>>
} 
export default function UnApprovedEvents({events,setOpen,setSelectedEvent,fetchLatestEvents}:UnApprovedEventsProps){
    
    return(
        <>
            {
                events.length === 0 ? 
                <div className="h-full w-full flex-col-center supports-[gap]:gap-y-3">
                    <div className="h-12 w-12 rounded-[50%] bg-gray-200/10 flex-row-center">
                        <GoInbox size={25} className="text-slate-500 dark:text-slate-300" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[14px]">No event requests available</p>
                </div>
                :
                (
                    <div>
                        {
                            events.length > 0 &&
                            <div className="py-2 w-full">
                                <div className="flex justify-between items-center">
                                    <h1 className="py-2 text-slate-600 dark:text-white">Event requests</h1>                                    
                                </div>
                            </div>
                        }    
                        <div className="flex flex-col gap-y-2">
                            {
                                events.map(
                                    event=>(
                                        <EventNotificationItem 
                                            key={event.Id} 
                                            fetchLatestEvents={fetchLatestEvents}
                                            event={event}
                                            setOpen={setOpen}
                                            setSelectedEvent={setSelectedEvent}
                                        />
                                    )
                                )
                            }
                        </div>
                  </div>
                )
            }   
        </>
    )
}