import { IEvent } from "@/app/constants/constants"
import { useState } from "react";
import { TfiSearch } from "react-icons/tfi";

type TableProp = {
    events:IEvent[],
    setFilteredEvents:React.Dispatch<React.SetStateAction<IEvent[]>>
}
export default function TableSearch({events,setFilteredEvents}:TableProp){
    function getMatchedEvents(e:React.ChangeEvent<HTMLInputElement>){
        const searchedevent = e.target.value.toLowerCase();
        const filteredevents = events.filter((event)=>{
            if(event.EventName.toLowerCase().includes(searchedevent) || event.Venue.toLowerCase().includes(searchedevent)){
                return event;
            }
        });
        setFilteredEvents(filteredevents);
    }
    return(
        <div className="relative max-w-[11rem]">
            <TfiSearch className="absolute top-[10px] left-[10px] dark:text-slate-100 text-slate-600" size={18}/>
            <input type="text" placeholder="Search event" 
                className="
                    dark:text-white bg-white text-slate-700 w-full
                    dark:bg-[#1c1c1c] border pl-[35px] focus:outline-4
                    focus:outline-[#1a1a1a] dark:focus:outline-white text-[14px]
                    rounded-[20px] border-[#575757] py-[6px]"
                onChange={getMatchedEvents} 
            />
        </div>
    )
}