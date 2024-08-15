"use client"
import { IEditorial } from "@/app/constants/constants"
import { GoInbox } from "react-icons/go"
import EditorialNotificationItem from "../notificationitem/editorialnotificationitem"

interface UnApprovedEventsProps {
    editorials:IEditorial[],
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedEditorial:React.Dispatch<React.SetStateAction<IEditorial|undefined>>
    fetchLatestEditorials:()=>void
} 
export default function UnApprovedEditorials({editorials,setOpen,setSelectedEditorial,fetchLatestEditorials}:UnApprovedEventsProps){
    
    return(
        <>
            {
                editorials.length === 0 ? 
                <div className="h-full w-full flex-col-center supports-[gap]:gap-y-3">
                    <div className="h-12 w-12 rounded-[50%] bg-gray-200/10 flex-row-center">
                        <GoInbox size={25} className="text-slate-500 dark:text-slate-300" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[14px]">No editorial requests available</p>
                </div>
                :
                (
                    <div>
                        {
                            editorials.length > 0 &&
                            <div className="py-2 w-full">
                                <div className="flex justify-between items-center">
                                    <h1 className="py-2 text-slate-600 dark:text-white">Editorial requests</h1>
                                </div>
                            </div>
                        }    
                        <div className="flex flex-col gap-y-2">
                            {
                                editorials.map(
                                    editorial=>(
                                        <EditorialNotificationItem 
                                            key={editorial.id} 
                                            fetchLatestEditorials={fetchLatestEditorials}
                                            editorial={editorial}
                                            setOpen={setOpen}
                                            setSelectedEditorial={setSelectedEditorial}
                                        />
                                    )
                                )
                            }
                        </div>
                  </div>
                )
            }   
        </>
    )
}