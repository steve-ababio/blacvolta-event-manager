import React from "react";
import { IEventDetails } from "@/app/constants/constants";
import ActionMenu from "../actionmenu/actionmenu";

interface TableRowProps{
    event:IEventDetails,
    setModalOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeletePrompt:React.Dispatch<React.SetStateAction<boolean>>
    setEvent:React.Dispatch<React.SetStateAction<IEventDetails|undefined>>
}   

type EventStatus = "Upcoming" | "Ended" | "Ongoing"|"Recurring";
let eventstatus:EventStatus = "Upcoming";
export default function TableRow({event,setEvent,setShowDeletePrompt,setModalOpen}:TableRowProps){
    const {EventDate,EventName,EventTime,Venue,Id} = event;
    const eventdate = new Date(event.EventDate);
    const currentdate = new Date();
    currentdate.setHours(0,0,0,0);
    if( event.EventDate != ""){
        if(eventdate < currentdate){
            eventstatus = "Ended";
        }else if(eventdate > currentdate){
            eventstatus = "Upcoming";
        }else if(eventdate.getTime() === currentdate.getTime()){
            eventstatus = "Ongoing";
        }
    }else{
        eventstatus = "Recurring";
    }
    return(
        <>
            <tr className="w-full dark:text-slate-200 text-slate-600 border-b border-b-gray-400/50 text-[14px]">
                <td className="align-top p-[.75rem]">{EventDate}</td>
                <td className="align-top p-[.75rem]">
                    <div className={`
                        ${eventstatus === 'Ongoing' ?'bg-green-300/20 dark:bg-green-300 dark:text-green-900 text-green-800 font-semibold':''}
                        ${eventstatus === 'Ended' ?'bg-red-300/20 text-red-800 dark:bg-red-300 dark:text-red-900 font-semibold':''}
                        ${eventstatus === 'Upcoming' ?'bg-violet-300/20 text-violet-800 dark:bg-violet-300 dark:text-violet-900 font-semibold':''}
                        ${eventstatus === 'Recurring' ?'bg-blue-300/20 text-blue-800 dark:bg-blue-300 dark:text-blue-900 font-semibold':''}
                        text-center py-[5px] rounded-[5px] text-[13px]
                        `
                    }>
                        {eventstatus}
                    </div>
                </td>
                <td className="align-top p-[.75rem]">{EventTime}</td>
                <td className="align-top p-[.75rem]">{Venue}</td>
                <td className="align-top p-[.75rem]">{EventName}</td>
                <td className="p-[0.75rem] flex gap-1 items-center">
                    <ActionMenu 
                        event={event} setEvent={setEvent}
                        setModalOpen={setModalOpen} 
                        setShowDeletePrompt={setShowDeletePrompt}
                    />
                </td>             
            </tr>
        </>
    )
}