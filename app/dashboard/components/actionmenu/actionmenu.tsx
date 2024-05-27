import { IEventDetails } from "@/app/constants/constants";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiExpandHorizontal } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";


interface ActionMenuProps{
    event:IEventDetails,
    setModalOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeletePrompt:React.Dispatch<React.SetStateAction<boolean>>
    setEvent:React.Dispatch<React.SetStateAction<IEventDetails|undefined>>
}   
export default function ActionMenu({event,setEvent,setModalOpen,setShowDeletePrompt}:ActionMenuProps){
    const [viewaction,setViewAction] = useState(false);
    const activeelement = useRef<HTMLDivElement>(null);
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
        <div className="relative cursor-pointer" >
                <div ref={activeelement} onClick={showAction} className="hover:bg-slate-300/30 p-1 rounded-[5px]">
                <BsThreeDots size={20}/>
                <div  className={`
                    ${viewaction ? 'scale-100':'scale-0'} 
                    z-30 duration-300 px-4 w-[10rem] shadow-md
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
                    <button onClick={showDeletePrompt} className="flex py-1 items-center rounded-md gap-x-4 mb-2 pl-2 hover:bg-slate-300/30 w-full">
                        <AiOutlineDelete size={20} color="rgb(239 68 68)" />
                        <div className="text-[14px] items-center text-red-500 flex flex-1">delete</div>
                    </button>
                </div>
            </div>
        </div>
    )
}