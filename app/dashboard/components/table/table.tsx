"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import TableRow from "@/app/dashboard/components/tablerow/tablerow";
import Modal from "../../../components/modal/modal";
import ViewEventDetails from "../../../components/modal/content/eventpreview/eventpreview";
import Link from "next/link";
import { FaCalendarPlus } from "react-icons/fa";
import DeleteRecord from "../../../components/modal/content/delete/deletedialog";
import { IEvent } from "@/app/constants/constants";
import { Slide, toast } from "react-toastify";
import TableSearch from "../tablesearch/tablesearch";

interface EventDetailsListProps{
    data:IEvent[],
}

export default function Table({data}:EventDetailsListProps){
    const [modalopen,setModalOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const [event,setEvent] = useState<IEvent>();
    const [showdeleteprompt,setShowDeletePrompt] = useState(false);
    const [events,setEvents] = useState(data);

    function closeModal(){
        setModalOpen(false);
    }
    function closeDeletePrompt(){
        setShowDeletePrompt(false);
    }
    async function deleteEvent(){
        setLoading(true);
        try{
            const response = await fetch(`/api/deleteevent/?id=${event?.Id}&imageurl=${event?.FlyerImagePath}`,{method:"DELETE"});
            const {message} = await response.json();
            toast.success(message,{
                transition:Slide
            });
            setTimeout(()=>{
                window.location.reload();
            },3000)
           
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
            closeDeletePrompt();
        }
    }   
    return(
        <div className="w-full rounded-t-[12px] pb-10 mb-4 shadow-md bg-white px-5 dark:bg-[#292b32]">
            <h1 className="py-5 font-bold text-slate-600 dark:text-white">Events </h1>
            <div className="flex justify-between">
                <div>
                    <Link className="w-fit block pb-5" href="/event">
                        <button className="
                            dark:bg-white dark:text-slate-600
                            bg-[#383838] text-white px-3
                            py-2 rounded-[5px] flex gap-x-1 justify-center
                            items-center hover:bg-btnprimarybold 
                            duration-200 shadow-md"
                        >
                            <FaCalendarPlus className="dark:text-slate-600 text-white " size={17} />
                            <span>create event</span>
                        </button>
                    </Link>
                </div>
                <div className="flex gap-x-3 justify-between sm:justify-start flex-row gap-y-8 sm:gap-y-0">
                    <TableSearch events={data} setFilteredEvents={setEvents}/>
                </div>
            </div>
            <div className="w-full overflow-auto pt-10">
            <table className="w-full shadow-sm">
                <thead className="bg-slate-400/30">
                    <tr className="text-left dark:text-slate-200 text-slate-600">
                        {/* <th className="p-[0.75rem]"></th> */}
                        <th className="p-[0.75rem]">Event Date</th>
                        <th className="p-[0.75rem]">Event Time</th>
                        <th className="p-[0.75rem]">Venue</th>
                        <th className="p-[0.75rem]">Event Name</th>
                        <th className="p-[0.75rem]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        events.map((event:IEvent)=>(
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
            </div>
            <Modal open={modalopen} onclose={closeModal}>
                <ViewEventDetails 
                    closeModal={closeModal}
                    event={event!} 
                    modalopen={modalopen} 
                />
            </Modal>
            <Modal open={showdeleteprompt} onclose={closeDeletePrompt}>
               <DeleteRecord
                    closeDeletePrompt={closeDeletePrompt} 
                    deleteRecord={deleteEvent} 
                    loading={loading}
                    deletetext="delete event"
                />
            </Modal>
        </div>
    )
}