import { useRef, useState } from "react";
import NotifButton from "../notifbutton/notifbutton"
import { RiExpandLeftRightLine } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";
import { IEventDetails } from "@/app/constants/constants";

type NotificationItemProp = {
    event:IEventDetails,
    setSelectedEvent:React.Dispatch<React.SetStateAction<IEventDetails|undefined>>
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    fetchLatestEvents:()=>void;
}
export default function NotificationItem({event,fetchLatestEvents,setSelectedEvent,setOpen}:NotificationItemProp){
    const {userId,Id,EventName} = event;
    const approveelement = useRef<HTMLButtonElement>(null);
    const rejectelement = useRef<HTMLButtonElement>(null);
    const [approvesubmitting,setApproveSubmitting] = useState(false);
    const [rejectsubmitting,setRejectSubmitting] = useState(false)

    async function approveEvent(){
        setApproveSubmitting(true);
        const response = await fetch("/api/approve",{method:"POST",body:JSON.stringify({userId,eventId:Id})});
        const data = await response.json();
        setApproveSubmitting(false);;
        fetchLatestEvents();
    }
    async function cancelEvent(){
        setRejectSubmitting(true);
        const response = await fetch("/api/reject",{method:"DELETE",body:JSON.stringify({userId,eventId:Id})});
        const data = await response.json();
        setRejectSubmitting(false);
        fetchLatestEvents();
    }
    function showModal(e:React.MouseEvent){
        setOpen(true);
        setSelectedEvent(event);
    }
    return(
        <div className="w-full">
            <div tabIndex={0}  className="
                rounded-[6px] text-center shadow-sm py-2
                dark:bg-slate-200/10 bg-slate-300/20 text-[14px]
                cursor-pointer border border-slate-200/20"
            >
                <div className="w-[80%] mx-auto">
                    <button className="text-right flex my-2 gap-x-2 hover:scale-105 duration-200 dark:bg-white bg-btnprimary text-white dark:text-slate-600 shadow-md rounded-[4px] py-[5px] px-2" onClick={showModal}>
                       <span>more</span><RiExpandLeftRightLine size={20}/>
                    </button>
                    <div>
                        <p className="text-slate-700 text-left dark:text-white">{EventName}<span> is pending approval</span></p>
                        <p className="dark:text-white text-left ">Please confirm</p>
                    </div>
                    <div className="flex justify-between w-full mt-2">
                        <NotifButton disabled={approvesubmitting} ref={approveelement} onClick={approveEvent} className="bg-btnprimary hover:scale-105 duration-200 disabled:cursor-not-allowed  dark:bg-white">
                           {
                            approvesubmitting?
                                <RotatingLines 
                                    strokeColor={`${approvesubmitting ?'black':'white'}`} 
                                    strokeWidth="4"
                                    animationDuration="0.8"
                                    width="20"
                                    visible={true} 
                                 />
                            :<span className={"text-white dark:text-black"}>approve</span>
                           }
                        </NotifButton>
                        <NotifButton disabled={rejectsubmitting} ref={rejectelement} onClick={cancelEvent} className="text-black hover:text-white dark:hover:text-black dark:text-white border hover:shadow-md dark:hover:bg-white hover:bg-btnprimary px-9 border-slate-400/40 dark:border-slate-200/30">
                            {
                                rejectsubmitting?
                                    <RotatingLines 
                                        strokeColor={`${rejectsubmitting ?'black':'white'}`} 
                                        strokeWidth="4"
                                        animationDuration="0.8"
                                        width="20"
                                        visible={true} 
                                    />
                                :
                                <span className={""}>reject</span>
                            }
                        </NotifButton>
                    </div>
                </div>
            </div>
        </div>
    )
}