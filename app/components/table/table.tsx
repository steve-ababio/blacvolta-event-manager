"use client"
import TableRow from "@/app/components/tablerow/tablerow";
import Modal from "../modal/modal";
import { useRef, useState } from "react";
import React from "react";
import { redirect, useRouter } from "next/navigation";

export interface IEventDetails {
    Id:string,
    Venue:string,
    EventDate:string,
    EventName:string,
    EventTime:string,
    SocialLinks:string,
    TicketLinks:string,
    Description:string,
    FlyerImagePath:string,
    InquiryNumber:string,
}

interface EventDetailsListProps{
    data:IEventDetails[],
}

export default function Table({data}:EventDetailsListProps){

    const [modalopen,setModalOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const [event,setEvent] = useState<IEventDetails>();
    const [showdeleteprompt,setShowDeletePrompt] = useState(false);
    const imgelement = useRef<HTMLImageElement>(null);
    const router = useRouter();

    function closeModal(){
        // imgelement.current!.src = "";
        setModalOpen(false);
    }
    function closeDeletePrompt(){
        setShowDeletePrompt(false);
    }
    async function deleteEvent(){
        setLoading(true);
        try{
            const response = await fetch(`/api/delete/?id=${event?.Id}`,{method:"DELETE"});
            const message = await response.json();
            window.location.reload();
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
            closeDeletePrompt()
        }
    }   
    return(
        <>
            <table className="w-full">
                <thead className="bg-blue-200/20">
                    <tr className="text-left">
                        <th className="p-[0.75rem]">Event Date</th>
                        <th className="p-[0.75rem]">Event Time</th>
                        <th className="p-[0.75rem]">Venue</th>
                        <th className="p-[0.75rem]">Event Name</th>
                        <th className="p-[0.75rem]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((event:IEventDetails)=>(
                            <React.Fragment key={event.Id}>
                                <TableRow
                                    setShowDeletePrompt={setShowDeletePrompt} 
                                    setModalOpen={setModalOpen} 
                                    setEvent={setEvent}
                                    event={event}
                                />
                            </React.Fragment>
                        ))
                    }
                </tbody>
            </table>
            <Modal open={modalopen} onclose={closeModal}>
                <div className={`w-[28rem] px-8 pt-8 bg-white overflow-y-auto relative z-50 duration-[350ms] ${modalopen ? 'scale-100':'scale-0'}`}>
                    <div className="relative w-full h-[18rem]">
                        <img ref={imgelement} className="rounded-[10px] h-full w-full absolute object-cover top-0 left-0" src={event?.FlyerImagePath} alt="event flyer image" />
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
            </Modal>
            <Modal open={showdeleteprompt} onclose={closeDeletePrompt}>
                <div className="rounded-[5px] blur-0 z-40 bg-white shadow-md">
                    <div className="flex justify-between p-4 text-slate-600 w-p[90%] max-w-[500px] items-center border-b border-b-slate-300/30">
                        <h2 className="text-[20px]">Confirm Deletion</h2>
                        <button onClick={closeDeletePrompt}>close</button>
                    </div>
                    <div className="p-4 border-b border-b-slate-300/30">
                        <p>Are you sure you want to delete this record? </p>
                    </div>
                    <div className="p-4 flex justify-end gap-1">
                        <button onClick={closeDeletePrompt} className="px-[0.75rem] py-[0.375rem] text-white rounded-[4px] bg-[#6C757D]">cancel</button>
                        <button onClick={deleteEvent} className="px-[0.75rem] py-[0.375rem] text-white rounded-[4px] bg-[#DC3545]">{loading? <span>Deleting...</span>:<span>delete</span>}</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}