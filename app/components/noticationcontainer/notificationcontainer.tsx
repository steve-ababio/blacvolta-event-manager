"use client"
import { PiBellSimple } from "react-icons/pi"
import Notifications from "../notifications/notifications"
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import { IEditorial, IUserEventDetails } from "@/app/constants/constants";
import { v4 as uuidv4 } from 'uuid';
import useFetch from "@/app/hooks/fetch/fetch";

const fetcher = ([url,_]:string[]) => fetch(url,{cache:"no-cache"}).then(r => r.json())

const NotificationContainer = ()=>{
    const random = useRef(Date.now())
    const eventsdata = useFetch<IUserEventDetails>("/api/unapprovedevents");
    const editorialsdata = useFetch<IEditorial>("/api/unapprovededitorials");
    // const eventsdata = useSWR(["/api/unapprovedevents",random.current],fetcher,{refreshWhenHidden:true,revalidateOnMount:true,refreshWhenOffline:true});
    // const editorialsdata = useSWR(["/api/unapprovededitorials",random.current],fetcher,{refreshWhenHidden:true,revalidateOnMount:true,refreshWhenOffline:true});
    const [visible,setVisible] = useState(false);
    const notificationref= useRef<HTMLDivElement>(null);
    const unapprovedevents = eventsdata.data;
    const unapprovededitorials = editorialsdata.data;
    
    
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
        eventsdata.fetchLatest("/api/unapprovedevents");
        
    }
    function fetchLatestEditorials(){
        editorialsdata.fetchLatest("/api/unapprovededitorials");
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
                iseventloading={eventsdata.isLoading}
                iseditorialloading={editorialsdata.isLoading}
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