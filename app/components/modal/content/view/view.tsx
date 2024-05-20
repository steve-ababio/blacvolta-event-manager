import { IEventDetails } from "@/app/dashboard/components/table/table";
import ViewEventDetailsItem from "@/app/components/viewdetailsinfo/viewdetailsinfo";
import React from "react";

type ViewEventDetailsProps = {
    modalopen:boolean
    event:IEventDetails
    closeModal:()=>void
}
function dayOfWeekAsString(dayIndex:number) {
    return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex] || '';
  }
const ViewEventDetails = ({event,modalopen,closeModal}:ViewEventDetailsProps) =>{
    if(event)
    return(
        <div className={`
            max-w-[28rem] w-[90%] px-8 pt-8 dark:border 
            dark:bg-[#191C20] bg-white 
            dark:border-slate-300/20 rounded
            overflow-y-auto relative z-[110] duration-[350ms]
            ${modalopen ? 'scale-100':'scale-0'}`
        }>
            <div className="w-full h-[16rem]">
                <img  className="rounded-[10px] max-h-full max-w-full" src={event?.FlyerImagePath} alt="event flyer image" />
            </div>
            <div className="text-[14px] md:text-[16px]">
                <h2 className="font-bold pt-3 text-slate-600 dark:text-slate-200 pb-2 text-[18px] text-center border-b border-b-slate-500/50">{event?.EventName}</h2>
                <div className="text-slate-500 dark:text-slate-200">
                    <ViewEventDetailsItem title="Event date: " eventinfo={event?.EventDate} />
                    <ViewEventDetailsItem title="Event time: " eventinfo={event?.EventTime} />
                    <ViewEventDetailsItem title="Venue: " eventinfo={event?.Venue} />
                    <ViewEventDetailsItem title="Description: " eventinfo={event?.Description} />
                    <ViewEventDetailsItem title="Ticket link: " eventinfo={event?.TicketLinks} />
                    <ViewEventDetailsItem title="Inquiry number: " eventinfo={event?.InquiryNumber} />
                    <ViewEventDetailsItem title="Social link: " eventinfo={event?.SocialLinks} />
                    {event.IsEventWeekly &&  <ViewEventDetailsItem title="Does event recur weekly? " eventinfo={"Yes"} />}
                    {event.IsEventWeekly && <ViewEventDetailsItem title="Recurring day: " eventinfo={dayOfWeekAsString(parseInt(event.DayofWeek,10))} />}
                </div>
            </div>
            <div className="w-full flex justify-end mb-5">
                <button className="bg-slate-600 text-white px-6 py-2 rounded-[4px]" onClick={closeModal}>close</button>
            </div>
        </div>
    )
}

ViewEventDetails.displayName = "ViewEventDetails";
export default ViewEventDetails;