import { GoInbox } from "react-icons/go";
import NotificationItem from "../notificationitem/notificationitem";
import React, { useState } from "react";
import Overlay from "../overlay/overlay";
import Modal from "../modal/modal";
import ViewEventDetails from "../modal/content/view/view";
import { IoRefreshOutline } from "react-icons/io5";
import { RotatingLines } from "react-loader-spinner";
import { IEventDetails } from "@/app/constants/constants";

type NotificationProps ={
    visible: boolean,
    setVisible:React.Dispatch<React.SetStateAction<boolean>>
    events:IEventDetails[],
    fetchLatestEvents:()=>void,
    isLoading:boolean
}

 const  Notifications = React.forwardRef<HTMLDivElement,NotificationProps>(({visible,fetchLatestEvents,isLoading,events,setVisible},ref)=>{
    const [open,setOpen] = useState(false);
    const [selectedevent,setSelectedEvent] = useState<IEventDetails>();
    function closeModal(){
        setOpen(false);
    }
    return(
        <>
            <div ref={ref} className={`
                sm:absolute sm:min-w-[22rem] fixed bottom-0 sm:left-full
                sm:top-full sm:-translate-x-full sm:duration-300 h-[80vh] left-0
                sm:h-[25rem] sm:mt-2 duration-[500ms] sm:shadow-md
                sm:translate-y-0 sm:w-auto w-full dark:bg-darkprimary 
                ${visible ? 'translate-y-0 sm:opacity-100 sm:scale-100': 'sm:opacity-0 translate-y-[calc(100%+10px)] sm:scale-0'}
                sm:rounded-[10px] rounded-t-[20px] border 
                dark:border-slate-300/30 overflow-y-auto transition
                 bg-white shadow-lg z-[100] p-3 border-b-slate-400/30
                `}
            >
                {
                    events.length === 0 ? 
                    <div className="h-full w-full flex-col-center supports-[gap]:gap-y-3">
                            <div className="h-12 w-12 rounded-[50%] bg-gray-200/10 flex-row-center">
                                <GoInbox size={25} className="text-slate-500 dark:text-slate-300" />
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-[14px]">No event requests available</p>
                        </div>
                    :
                    (
                        <div>
                            {
                                events.length > 0 &&
                                <div className="py-2 w-full">
                                    <div className="flex justify-between items-center">
                                        <h1 className="py-2 text-slate-600 dark:text-white">Event requests</h1>
                                        <button onClick={fetchLatestEvents} className="h-[30px] w-[30px] rounded-[50%] flex justify-center items-center shadow-md hover:scale-[1.1] duration-200 dark:bg-white/40 " title="refresh ">
                                            {
                                                isLoading ? 
                                                    <RotatingLines 
                                                        strokeColor="white"
                                                        strokeWidth="4"
                                                        animationDuration="0.8"
                                                        width="20"
                                                        visible={true}
                                                    />
                                                :
                                                <IoRefreshOutline size={20} className="text-slate-600 dark:text-white" />
                                            }
                                        </button>
                                        
                                    </div>
                                    <hr/>
                                </div>
                            }
                             
                            <div className="flex flex-col gap-y-2">
                                {
                                    
                                    events.map(
                                        event=>(
                                            <NotificationItem 
                                                key={event.Id} 
                                                fetchLatestEvents={fetchLatestEvents}
                                                event={event}
                                                setOpen={setOpen}
                                                setSelectedEvent={setSelectedEvent}
                                            />
                                        )
                                    )
                                }
                            </div>
                        </div>
                    )
                    
                    
                }
            </div>
            <Overlay setVisible={setVisible} visible={visible}/>
            <Modal open={open} onclose={closeModal}>
                <ViewEventDetails 
                    closeModal={closeModal}
                    event={selectedevent!} 
                    modalopen={open} 
                />
            </Modal>
        </>
    )
});
export default Notifications;
Notifications.displayName = "Notifications";