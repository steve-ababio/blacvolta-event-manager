"use client"
import { PiBellSimple } from "react-icons/pi"
import Notifications from "../notifications/notifications"
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import { IEventDetails } from "@/app/constants/constants";

const fetcher = (url:string)=>fetch(url,{cache:"no-store"}).then(res => res.json());
const NotificationContainer = ()=>{
    const {data,mutate,isValidating} = useSWR("/api/unapprovedevents",fetcher,{refreshWhenHidden:true,revalidateOnMount:true,refreshWhenOffline:true});
    const [visible,setVisible] = useState(false);
    const notificationref= useRef<HTMLDivElement>(null);
    const events:IEventDetails[] = data || [];
    
    useEffect(()=>{
        // ,{capture:true}
        window.addEventListener("click",closeMenu);
        return ()=>(
            window.removeEventListener("click",closeMenu)
        )
    },[]);

    function fetchLatestEvents(){
        mutate();
    }
    function closeMenu(e:MouseEvent){
        if(!notificationref.current!.contains(e.target as HTMLElement)){
            setVisible(false);
        }
    }
    function showNotificationMenu(){
        setVisible(!visible);
    }
    return (
        <div ref={notificationref} className="relative text-slate-500 dark:text-slate-300">
            <button className="relative px-2 flex items-center lg:after:content-['requests'] tooltip" onClick={showNotificationMenu}>
                    <PiBellSimple size={26} className="text-slate-500 dark:text-slate-100" /> 
                    {
                        events!.length > 0 && <div data-indicator className="absolute top-[1px] left-[7px] w-[13px] h-[13px] flex-col-center dark:bg-slate-100 bg-slate-700 rounded-[50%]">
                            <span className="text-white dark:text-slate-600 font-semibold text-[8px]">{events!.length}</span>
                        </div>
                    }
                </button>
            <Notifications
                fetchLatestEvents={fetchLatestEvents} 
                isLoading={isValidating}
                events={events!} 
                setVisible={setVisible} 
                visible={visible}
            />
        </div>
    )
}


export default NotificationContainer;
NotificationContainer.displayName = "NotificationContainer";