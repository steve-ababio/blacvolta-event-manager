import { MdDelete, MdModeEdit } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { IEventDetails } from "../table/table";
import Link from "next/link";

interface TableRowProps{
    event:IEventDetails,
    setModalOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeletePrompt:React.Dispatch<React.SetStateAction<boolean>>
    setEvent:React.Dispatch<React.SetStateAction<IEventDetails|undefined>>
}   

export default function TableRow({event,setEvent,setShowDeletePrompt,setModalOpen}:TableRowProps){
    const {EventDate,EventName,EventTime,Venue,Id} = event;
    
    function openModal(){
        setModalOpen(true);
        setEvent({...event});
    }
    
    function showDeletePrompt(){
        setEvent({...event});
        setShowDeletePrompt(true);
    }
    return(
        <>
            <tr className="w-full border-b border-b-gray-400">
                <td className="align-top p-[.75rem]">{EventDate}</td>
                <td className="align-top p-[.75rem]">{EventTime}</td>
                <td className="align-top p-[.75rem]">{Venue}</td>
                <td className="align-top p-[.75rem]">{EventName}</td>
                <td className="p-[0.75rem] flex gap-1 items-center">
                    <button onClick={openModal}  className="p-2 bg-yellow-600 hover:bg-yellow-800 block rounded-md ">
                        <RxHamburgerMenu size={20} color="white" />
                    </button>
                    <button onClick={showDeletePrompt} className="p-2 bg-red-500 hover:bg-red-700 block rounded-md">
                        <MdDelete size={20} color="white"/>
                    </button>
                    <Link  href={{pathname:`/edit`,query:{...event}}}>
                        <button className="p-2 bg-slate-500 hover:bg-slate-700 block rounded-md">
                            <MdModeEdit size={20} color="white"/>
                        </button>
                    </Link>
                    
                </td>             
            </tr>
            
        </>
    )
}