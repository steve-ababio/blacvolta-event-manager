import { useRef, useState } from "react";
import NotifButton from "../notifbutton/notifbutton"
import { RotatingLines } from "react-loader-spinner";
import {IUserEventDetails } from "@/app/constants/constants";
import { useTheme } from "next-themes";
import { Slide, toast } from "react-toastify";

type NotificationItemProp = {
    event:IUserEventDetails,
    setSelectedEvent:React.Dispatch<React.SetStateAction<IUserEventDetails|undefined>>
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    fetchLatestEvents:()=>void;
}
export default function EventNotificationItem({event,fetchLatestEvents,setSelectedEvent,setOpen}:NotificationItemProp){
    const {Id,EventName,Organizationname,Email,EventId} = event;
    const approveelement = useRef<HTMLButtonElement>(null);
    const rejectelement = useRef<HTMLButtonElement>(null);
    const [approvesubmitting,setApproveSubmitting] = useState(false);
    const [rejectsubmitting,setRejectSubmitting] = useState(false);
    const {theme} = useTheme();

    async function approveEvent(){
        setApproveSubmitting(true);
        const response = await fetch("/api/approveevent",{method:"PUT",body:JSON.stringify({name:Organizationname,email:Email,Id,eventId:EventId})});
        const data = await response.json();
        toast.success(`${EventName} has been approved successfully`,{
            transition:Slide
        });
        setApproveSubmitting(false);;
        fetchLatestEvents();
    }
    async function cancelEvent(){
        setRejectSubmitting(true);
        const response = await fetch("/api/rejectevent",{method:"DELETE",body:JSON.stringify({eventId:Id})});
        const data = await response.json();
        toast.success(`${EventName} ${data.message}`,{
            transition:Slide
        });
        setRejectSubmitting(false);
        fetchLatestEvents();
    }
    function showModal(e:React.MouseEvent){
        if(!Object.is(e.target,approveelement.current) && !Object.is(e.target,rejectelement.current)){
            setOpen(true);
            setSelectedEvent(event);
        }
        
    }
    return(
        <div className="w-full">
            <div tabIndex={0} onClick={showModal} className="
                rounded-[6px] text-center shadow-sm py-2
                dark:bg-slate-200/10 bg-slate-300/20 text-[14px]
                cursor-pointer"
            >
                <div className="w-full px-5 py-4">
                    <div>
                        <p className="text-slate-700 text-left dark:text-white text-[1rem] mb-3">{EventName}<span> is pending approval</span></p>
                        <p className="dark:text-gray-400/50 text-left mb-4 text-gray-700 text-[0.8]">Please confirm</p>
                    </div>
                    <div className="flex w-full gap-x-4 mt-2">
                        <NotifButton 
                            disabled={approvesubmitting} ref={approveelement}
                            onClick={approveEvent} className="
                            bg-btnprimary text-white dark:text-black
                             duration-200 disabled:cursor-not-allowed
                            dark:bg-white"
                        >
                           {
                            approvesubmitting?
                                theme === "dark" ?
                                <RotatingLines 
                                    strokeColor="gray"
                                    strokeWidth="4"
                                    animationDuration="0.8"
                                    width="17"
                                    visible={true}
                                />:
                                <RotatingLines 
                                    strokeColor="white"
                                    strokeWidth="4"
                                    animationDuration="0.8"
                                    width="17"
                                    visible={true}
                                />
                            :'approve'
                           }
                        </NotifButton>
                        <NotifButton
                             disabled={rejectsubmitting} ref={rejectelement}
                             onClick={cancelEvent} className="text-black
                             hover:text-white duration-300 dark:hover:text-black
                            dark:text-white border hover:shadow-md dark:hover:bg-white
                            hover:bg-btnprimary border-slate-400/40 dark:border-slate-200/30"
                        >
                            {
                                rejectsubmitting?
                                theme === "dark" ?
                                <RotatingLines 
                                    strokeColor="gray"
                                    strokeWidth="4"
                                    animationDuration="0.8"
                                    width="17"
                                    visible={true}
                                />:
                                <RotatingLines 
                                    strokeColor="white"
                                    strokeWidth="4"
                                    animationDuration="0.8"
                                    width="17"
                                    visible={true}
                                />
                                :
                                "reject"
                            }
                        </NotifButton>
                    </div>
                </div>
            </div>
        </div>
    )
}