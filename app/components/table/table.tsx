"use client"
import React from "react";
import { useRef, useState } from "react";
import TableRow from "@/app/components/tablerow/tablerow";
import Modal from "../modal/modal";
import DeleteEvent from "../modal/content/delete/deletedialog";
import ViewEventDetails from "../modal/content/view/view";

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

    function closeModal(){
        setModalOpen(false);
    }
    function closeDeletePrompt(){
        setShowDeletePrompt(false);
    }
    async function deleteEvent(){
        setLoading(true);
        try{
            const response = await fetch(`/api/delete/?id=${event?.Id}&imageurl=${event?.FlyerImagePath}`,{method:"DELETE"});
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
        <div className="w-[90%] mx-auto max-w-[70rem]">
            <div className="mb-[6px]">
                <input role="searchbox" className="border border-zinc-400 pl-3 outline-none focus:ring-1 focus:ring-blue-500 py-[6px] rounded-[20px]" placeholder="search" />
            </div>
            <table className="w-full shadow-md">
                <thead className="bg-blue-200/20">
                    <tr className="text-left text-slate-600">
                        <th className="p-[0.75rem]"></th>
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
                <ViewEventDetails 
                    closeModal={closeModal}
                    event={event!} 
                    ref={imgelement} 
                    modalopen={modalopen} 
                />
            </Modal>
            <Modal open={showdeleteprompt} onclose={closeDeletePrompt}>
               <DeleteEvent 
                    closeDeletePrompt={closeDeletePrompt} 
                    deleteEvent={deleteEvent} 
                    loading={loading}
                />
            </Modal>
        </div>
    )
}