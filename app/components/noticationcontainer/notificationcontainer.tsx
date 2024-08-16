"use client"
import { PiBellSimple } from "react-icons/pi"
import Notifications from "../notifications/notifications"
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import { IEditorial, IUserEventDetails } from "@/app/constants/constants";
import { v4 as uuidv4 } from 'uuid';

const fetcher = (url:string) => fetch(url,{cache:"no-store"}).then(r => r.json())

const NotificationContainer = ()=>{
    // const eventsdata = useSWR("/api/unapprovedevents",fetcher,{refreshWhenHidden:true,revalidateOnMount:true,refreshWhenOffline:true});
    // const editorialsdata = useSWR("/api/unapprovededitorials",fetcher,{refreshWhenHidden:true,revalidateOnMount:true,refreshWhenOffline:true});
    const eventsdata = useSWR(["events",uuidv4()],async()=>{
        const response = await fetch("/api/unapprovedevents");
        const events = await response.json();
        return events;
    },{refreshWhenHidden:true,revalidateOnMount:true,refreshWhenOffline:true});
    const editorialsdata = useSWR(["editorials",uuidv4()],async()=>{
        const response = await fetch("/api/unapprovededitorials");
        const editorials = await response.json();
        return editorials;
    },{refreshWhenHidden:true,revalidateOnMount:true,refreshWhenOffline:true});
    
    const [visible,setVisible] = useState(false);
    const notificationref= useRef<HTMLDivElement>(null);
    const unapprovedevents = eventsdata.data;
    const unapprovededitorials = editorialsdata.data!;
    
    const events:IUserEventDetails[] = unapprovedevents || [];
    const editorials:IEditorial[] = unapprovededitorials || [];
    useEffect(()=>{
        // ,{capture:true}
        window.addEventListener("click",closeMenu);
        return ()=>(
            window.removeEventListener("click",closeMenu)
        )
    },[]);

    function fetchLatestEvents(){
        eventsdata.mutate();
        
    }
    function fetchLatestEditorials(){
        editorialsdata.mutate();
    }
    function closeMenu(e:MouseEvent){
        if(!notificationref.current!.contains(e.target as HTMLElement)){
            setVisible(false);
        }
    }
    function showNotificationMenu(){
        setVisible(!visible);
    }
    let notificationcount = events.length + editorials.length;
    return (
        <div ref={notificationref} className="relative text-slate-500 dark:text-slate-300">
            <button className="relative px-2 flex items-center lg:after:content-['requests'] tooltip" onClick={showNotificationMenu}>
                <PiBellSimple size={26} className="text-slate-500 dark:text-slate-100" /> 
                {
                    (events!.length > 0 || editorials.length > 0 )&& <div data-indicator className="absolute top-[1px] left-[7px] w-[13px] h-[13px] flex-col-center dark:bg-slate-100 bg-slate-700 rounded-[50%]">
                        <span className="text-white dark:text-slate-600 font-semibold text-[8px]">{notificationcount.toString()}</span>
                    </div>
                }
            </button>
            <Notifications
                fetchLatestEvents={fetchLatestEvents} 
                fetchLatestEditorials={fetchLatestEditorials}
                iseventloading={eventsdata.isValidating}
                iseditorialloading={editorialsdata.isValidating}
                events={events!} 
                editorials={editorials} 
                setVisible={setVisible} 
                visible={visible}
            />
        </div>
    )
}


export default NotificationContainer;
NotificationContainer.displayName = "NotificationContainer";