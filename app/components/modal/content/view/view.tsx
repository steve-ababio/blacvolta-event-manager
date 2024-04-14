import { IEventDetails } from "@/app/components/table/table";
import React from "react";
import { BsCalendarDate, BsFillCalendar2DateFill, BsSmartwatch } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { LiaPhoneSolid } from "react-icons/lia";
import { MdOutlineDescription } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { TbExternalLink } from "react-icons/tb";

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
            <div>
                <h2 className="font-bold pt-3 pb-2 text-[18px] text-center border-b border-b-slate-500/50">{event?.EventName}</h2>
                <div className="text-slate-500">
                    <div className="py-[6px]">
                        <span className="font-bold">Event date: </span>
                        <span>{event?.EventDate}</span>
                    </div>
                    <div className="py-[6px]">
                        <span className="font-bold">Event time: </span>
                        <span>{event?.EventTime}</span>
                    </div>
                    <div className="py-[6px]">
                        <span className="font-bold">Venue: </span>
                        <span>{event?.Venue}</span>
                    </div>
                    <div className="py-[6px]">
                        <span className="font-bold">Description: </span>
                        <span>{event?.Description}</span>
                    </div>
                    <div className="py-[6px]">
                        <span className="font-bold">Ticket link: </span>
                        <span>{event?.TicketLinks}</span>
                    </div>
                    <div className="py-[6px]">
                        <span className="font-bold">Inquiry number: </span>
                        <span>{event?.InquiryNumber}</span>
                    </div>
                    <div className="py-[6px]">
                        <span className="font-bold">Social link: </span>
                        <span>{event?.SocialLinks}</span>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end mb-5">
                <button className="bg-slate-600 text-white px-6 py-2 rounded-[4px]" onClick={closeModal}>close</button>
            </div>
        </div>
    )
})

ViewEventDetails.displayName = "ViewEventDetails";
export default ViewEventDetails;