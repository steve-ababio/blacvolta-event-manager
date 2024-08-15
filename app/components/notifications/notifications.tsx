import React, { useState } from "react";
import Modal from "../modal/modal";
import ViewEventDetails from "../modal/content/eventpreview/eventpreview";
import { IEditorial, IUserEventDetails, Tab_T } from "@/app/constants/constants";
import UnApprovedEvents from "../unapprovedevents/unapprovedevents";
import UnApprovedEditorials from "../unapprovededitorials/unapprovededitorials";
import Tab from "../tab/tab";
import EditorialPreview from "../modal/content/editorialview/editorialpreview";

type NotificationProps ={
    visible: boolean,
    setVisible:React.Dispatch<React.SetStateAction<boolean>>
    events:IUserEventDetails[],
    editorials:IEditorial[],
    fetchLatestEvents:()=>void,
    fetchLatestEditorials:()=>void,
    iseventloading:boolean,
    iseditorialloading:boolean,
}

 const  Notifications = React.forwardRef<HTMLDivElement,NotificationProps>(({visible,iseditorialloading,iseventloading,fetchLatestEditorials,fetchLatestEvents,events,editorials,setVisible},ref)=>{
    const [eventmodalopen,setEventModalOpen] = useState(false);
    const [selectedevent,setSelectedEvent] = useState<IUserEventDetails>();
    const [editorialmodalopen,setEditorialModalOpen] = useState(false);
    const [selectededitorial,setSelectedEditorial] = useState<IEditorial>();
    const [tab,setTab] = useState<Tab_T>("EVENTS");

    function fetchLatest(){
        fetchLatestEditorials();
        fetchLatestEvents();
    }
    function closeEventModal(){
        setEventModalOpen(false);
    }
    function closeEditorialModal(){
        setEditorialModalOpen(false);
    }
    function setEditorialsTab(){
        setTab("EDITORIALS");
    }
    function setEventsTab(){
        setTab("EVENTS");
    }
    return(
        <>
            <div ref={ref} className={`
                sm:absolute sm:min-w-[22rem] fixed bottom-0 sm:left-full
                sm:top-full sm:-translate-x-full sm:duration-300 h-[80vh] left-0
                sm:h-[25rem] sm:mt-2 duration-[500ms] sm:shadow-md
                sm:translate-y-0 sm:w-auto w-full dark:bg-[rgba(31,31,31,1)] 
                ${visible ? 'translate-y-0 sm:opacity-100 sm:scale-100': 'sm:opacity-0 translate-y-[calc(100%+10px)] sm:scale-0'}
                sm:rounded-[10px] rounded-t-[20px] border 
                dark:border-slate-300/30 overflow-y-auto transition
                 bg-white shadow-lg z-[100] p-3 border-b-slate-400/30
                `}
            >
                <Tab 
                    setEditorialsTab={setEditorialsTab}
                    setEventsTab={setEventsTab}
                    tab={tab}
                    fetchLatest={fetchLatest}
                    unapprovededitorialscount={editorials.length}
                    unapprovedeventscount={events.length}
                    isLoading={iseditorialloading || iseventloading}
                />
                {   
                    tab === "EVENTS" &&  <UnApprovedEvents 
                        events={events}
                        fetchLatestEvents={fetchLatestEvents}
                        setOpen={setEventModalOpen}
                        setSelectedEvent={setSelectedEvent}
                    />
                }
                {
                    tab === "EDITORIALS" && <UnApprovedEditorials
                        editorials={editorials}
                        fetchLatestEditorials={fetchLatestEditorials}
                        setSelectedEditorial={setSelectedEditorial}
                        setOpen={setEditorialModalOpen}
                    />
                }
            </div>
            {/* <Overlay setVisible={setVisible} visible={visible}/> */}
            <Modal open={eventmodalopen} onclose={closeEventModal}>
                <ViewEventDetails 
                    closeModal={closeEventModal}
                    event={selectedevent!} 
                    modalopen={eventmodalopen} 
                />
            </Modal>
            <Modal open={editorialmodalopen} onclose={closeEditorialModal}>
                <EditorialPreview 
                    closeModal={closeEditorialModal}
                    editorial={selectededitorial!}
                    modalopen={editorialmodalopen} 
                />
            </Modal>
            
        </>
    )
});
export default Notifications;
Notifications.displayName = "Notifications";