
import { MdOutlineEdit } from "react-icons/md";
import { IEventDetails } from "../table/table";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { BiExpandHorizontal } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";

interface TableRowProps{
    event:IEventDetails,
    setModalOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeletePrompt:React.Dispatch<React.SetStateAction<boolean>>
    setEvent:React.Dispatch<React.SetStateAction<IEventDetails|undefined>>
}   

export default function TableRow({event,setEvent,setShowDeletePrompt,setModalOpen}:TableRowProps){
    
    const {EventDate,EventName,EventTime,Venue,Id} = event;
    const [viewaction,setViewAction] = useState(false);
    const activeelement = useRef<HTMLDivElement>(null);

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
    function closeAction(e:React.MouseEvent){
        if(viewaction && e.target !== activeelement.current){
            
            setViewAction(false);
        }
    }
    
    return(
        <>
            <tr className="w-full border-b border-b-gray-400">
                <td className="align-top p-[.75rem]">{EventDate}</td>
                <td className="align-top p-[.75rem]">{EventTime}</td>
                <td className="align-top p-[.75rem]">{Venue}</td>
                <td className="align-top p-[.75rem]">{EventName}</td>
                <td className="p-[0.75rem] flex gap-1 justify-center items-center">
                    <div className="relative cursor-pointer" onClick={showAction}>
                        <BsThreeDots size={20}/>
                        <div ref={activeelement} className={`${viewaction ? 'scale-100':'scale-0'} z-30 duration-300 py-3 absolute top-full right-full px-4 w-[10rem] shadow-md bg-white`}>
                            <button onClick={openModal} className="flex items-center gap-x-4 mb-3 hover:bg-slate-400/20 w-full">
                                <BiExpandHorizontal size={20} />
                                <div className="text-[14px] flex items-center flex-1">view more</div>
                            </button>
                            <Link href={{pathname:`/dashboard/edit`,query:{...event}}}>
                                <button className="flex items-center gap-x-4 mb-3 hover:bg-slate-400/20 w-full">
                                    <MdOutlineEdit size={20} />
                                    <div className="text-[14px] items-center flex flex-1">edit</div>
                                </button>
                            </Link>
                            <button onClick={showDeletePrompt} className="flex items-center gap-x-4 mb-3 hover:bg-slate-400/20 w-full">
                                <AiOutlineDelete size={20} color="rgb(239 68 68)" />
                                <div className="text-[14px] items-center text-red-500 flex flex-1">delete</div>
                            </button>
                        </div>
                        
                    </div>
                    <div onClick={closeAction} className={`z-10 fixed inset-0  ${viewaction ? 'block':'hidden'}`}></div>
                    
                </td>             
            </tr>
            
        </>
    )
}