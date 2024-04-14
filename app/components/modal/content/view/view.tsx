import { IEventDetails } from "@/app/components/table/table";
import React from "react";

type ViewEventDetailsProps = {
    modalopen:boolean
    event:IEventDetails
    closeModal:()=>void
}
const ViewEventDetails = React.forwardRef<HTMLImageElement,ViewEventDetailsProps>(({event,modalopen,closeModal},ref) =>{
    return(
        <div className={`w-[28rem] px-8 pt-8 bg-white overflow-y-auto relative z-50 duration-[350ms] ${modalopen ? 'scale-100':'scale-0'}`}>
            <div className="relative w-full h-[18rem]">
                <img ref={ref} className="rounded-[10px] h-full w-full absolute object-cover top-0 left-0" src={event?.FlyerImagePath} alt="event flyer image" />
            </div>
            <div >
                <h2 className="font-bold py-5 text-[18px] text-center border-b border-b-slate-500/50">{event?.EventName}</h2>
                <div>
                    <div className="py-[6px]"><span className="font-bold">Date: </span>{event?.EventDate}</div>
                    <div className="py-[6px]"><span className="font-bold">Time: </span>{event?.EventTime}</div>
                    <div className="py-[6px]"><span className="font-bold">Venue: </span>{event?.Venue}</div>
                    <div className="py-[6px]"><span className="font-bold">Description: </span>{event?.Description}</div>
                    <div className="py-[6px]"><span className="font-bold">Ticket Links: </span>{event?.TicketLinks}</div>
                    <div className="py-[6px]"><span className="font-bold">Inquiry Number: </span>{event?.InquiryNumber}</div>
                    <div className="py-[6px]"><span className="font-bold">Social Links: </span>{event?.SocialLinks}</div>
                </div>
            </div>
            <div className="w-full flex justify-end mb-5">
                <button className="bg-slate-600 text-white px-6 py-2 rounded-[4px]" onClick={closeModal}>close</button>
            </div>
        </div>
    )
})

export default ViewEventDetails;