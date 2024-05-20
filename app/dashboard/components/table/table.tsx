"use client"
import React from "react";
import { useState } from "react";
import TableRow from "@/app/dashboard/components/tablerow/tablerow";
import Modal from "../../../components/modal/modal";
import ViewEventDetails from "../../../components/modal/content/view/view";
import Link from "next/link";
import { FaCalendarPlus } from "react-icons/fa";
import DeleteRecord from "../../../components/modal/content/delete/deletedialog";
import { IEventDetails } from "@/app/constants/constants";
import { Slide, toast } from "react-toastify";



interface EventDetailsListProps{
    data:IEventDetails[],
}

export default function Table({data}:EventDetailsListProps){
    const [modalopen,setModalOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const [event,setEvent] = useState<IEventDetails>();
    const [showdeleteprompt,setShowDeletePrompt] = useState(false);

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
            <Link className="w-fit block pb-5" href="/event">
                <button className="
                    dark:bg-white dark:text-slate-600
                    bg-black text-white px-3
                    py-2 rounded-[5px] flex gap-x-1 justify-center
                    items-center hover:bg-btnprimarybold 
                    duration-200 shadow-md "
                >
                    <FaCalendarPlus className="dark:text-slate-600 text-white " size={17} />
                    <span>create event</span>
                </button>
            </Link>
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