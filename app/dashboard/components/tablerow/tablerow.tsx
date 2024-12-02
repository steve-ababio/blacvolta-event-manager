
import { MdOutlineEdit } from "react-icons/md";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { BiExpandHorizontal } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import React, {useEffect, useRef, useState } from "react";
import { IEvent } from "@/app/constants/constants";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { Slide, toast } from "react-toastify";

interface TableRowProps{
    event:IEvent,
    setModalOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeletePrompt:React.Dispatch<React.SetStateAction<boolean>>
    setEvent:React.Dispatch<React.SetStateAction<IEvent|undefined>>
}   

export default function TableRow({event,setEvent,setShowDeletePrompt,setModalOpen}:TableRowProps){
    const {EventDate,EventName,EventTime,Venue,Id,hidden} = event;
    const [viewaction,setViewAction] = useState(false);
    const activeelement = useRef<HTMLDivElement>(null);

    let date = "";
    if(EventDate != ""){
        date = new Date(EventDate).toLocaleDateString("en-us",{
            day:"numeric",
            month:"short",
            year:"numeric"
        });
    }   
    useEffect(function(){
        window.addEventListener("click",closeActionMenu);
        return function(){
            window.removeEventListener("click",closeActionMenu);
        }
    },[]);
    
    function closeActionMenu(e:MouseEvent){
        if(!activeelement.current?.contains(e.target as HTMLDivElement)){
            setViewAction(false);
        }
    }
    async function toggleEventVisibility(){
        const response = await fetch("/api/toggle-event-visibility",{method:"PUT",body:JSON.stringify({Id,hidden:!hidden})});
        const {message,success} = await response.json();
        if(success){
            toast.success(message,{
                transition:Slide
            });
            setTimeout(()=>{
                window.location.reload();
            },3000)
        }
    }   
    function openModal(){
        setModalOpen(true);
        setEvent({...event});
    }
    function showDeletePrompt(){
        setEvent({...event});
        setShowDeletePrompt(true);
    }
    function showAction(){
        setViewAction(true);            
    }
    return(
        <>
            <tr className="w-full dark:text-slate-200 text-slate-600 border-b border-b-gray-400/50 text-[14px]">
                {/* <td className="p-[.7srem] text-center"><input className="w-[18px] border-2 focus:outline-2 focus:-outline-offset-1 focus:outline-blue-400 h-[18px] cursor-pointer" type="checkbox" /></td> */}
                <td className="align-top p-[.75rem]">{date}</td>
                <td className="align-top p-[.75rem]">{EventTime}</td>
                <td className="align-top p-[.75rem]">{Venue}</td>
                <td className="align-top p-[.75rem]">{EventName}</td>
                <td className="p-[0.75rem] flex gap-1 items-center">
                    <div className="relative cursor-pointer" >
                        <div ref={activeelement} onClick={showAction} className="hover:bg-slate-300/30 p-1 rounded-[5px]">
                            <BsThreeDots size={20}/>
                            <div  className={`
                                ${viewaction ? 'scale-100':'scale-0'} 
                                z-100 duration-300 px-4 w-[12rem] shadow-md
                                py-3 absolute -right-[50%] -bottom-3
                                dark:border dark:bg-darkprimary bg-white 
                                dark:border-slate-300/20 rounded-md
                                `
                            }>
                                <button onClick={openModal} className="flex items-center py-1 rounded-md gap-x-4 mb-2 pl-2 hover:bg-slate-300/30 w-full">
                                    <BiExpandHorizontal size={20} />
                                    <div className="text-[14px] flex items-center py-1 flex-1">view more</div>
                                </button>
                                <Link href={{pathname:`/edit`,query:{...event}}}>
                                    <button className="flex items-center gap-x-4 mb-2 py-1 rounded-md hover:bg-slate-300/30 pl-2 w-full">
                                        <MdOutlineEdit size={20} />
                                        <div className="text-[14px] items-center flex flex-1">edit</div>
                                    </button>
                                </Link>
                                <button onClick={toggleEventVisibility} className="flex items-center gap-x-4 mb-2 py-1 rounded-md hover:bg-slate-300/30 pl-2 w-full">
                                    {
                                        hidden ?
                                        <>
                                            <IoEyeOutline size={20}/>
                                            <div className="text-[14px] flex items-center py-1 flex-1">unhide event</div>
                                        </>
                                        :
                                        <>
                                            <FaRegEyeSlash size={20}/>
                                            <div className="text-[14px] flex items-center py-1 flex-1">hide event</div>
                                        </>
                                    }
                                </button>
                                <button onClick={showDeletePrompt} className="flex py-1 items-center rounded-md gap-x-4 mb-2 pl-2 hover:bg-slate-300/30 w-full">
                                    <AiOutlineDelete size={20} color="rgb(239 68 68)" />
                                    <div className="text-[14px] items-center text-red-500 flex flex-1">delete</div>
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </td>             
            </tr>
        </>
    )
}