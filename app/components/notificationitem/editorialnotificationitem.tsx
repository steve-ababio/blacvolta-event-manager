import { useRef, useState } from "react";
import NotifButton from "../notifbutton/notifbutton"
import { RiExpandLeftRightLine } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";
import { IEditorial } from "@/app/constants/constants";
import { Loader } from "../loader/loader";
import { useTheme } from "next-themes";
import { Slide, toast } from "react-toastify";

type EditorialNotificationItemProp = {
    editorial:IEditorial,
    setSelectedEditorial:React.Dispatch<React.SetStateAction<IEditorial|undefined>>
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    fetchLatestEditorials:()=>void;
}
export default function EditorialNotificationItem({editorial,fetchLatestEditorials,setSelectedEditorial,setOpen}:EditorialNotificationItemProp){
    const approveelement = useRef<HTMLButtonElement>(null);
    const rejectelement = useRef<HTMLButtonElement>(null);
    const [approvesubmitting,setApproveSubmitting] = useState(false);
    const [rejectsubmitting,setRejectSubmitting] = useState(false)
    const {theme} = useTheme();

    async function approveEvent(){
        setApproveSubmitting(true);
        const response = await fetch("/api/approveeditorial",{method:"POST",body:JSON.stringify({editorialId:editorial.id})});
        const {message} = await response.json();
        toast.success(`${editorial.title} has been approved successfully`,{
            transition:Slide
        });
        setApproveSubmitting(false);;
        fetchLatestEditorials();
    }
    async function cancelEvent(){
        setRejectSubmitting(true);
        const response = await fetch("/api/rejecteditorial",{method:"DELETE",body:JSON.stringify({editorialId:editorial.id})});
        const {message} = await response.json();
        toast.success(`${editorial.title} has been rejected`,{
            transition:Slide
        });
        setRejectSubmitting(false);
        fetchLatestEditorials();
    }
    function showModal(e:React.MouseEvent){
        if(!Object.is(e.target,approveelement.current) && !Object.is(e.target,rejectelement.current)){
            setOpen(true);
            setSelectedEditorial(editorial);
        }
        
    }
    return(
        <div className="w-full">
            <div tabIndex={0} onClick={showModal} className="
               rounded-[6px] text-center shadow-sm py-2
                dark:bg-slate-200/10 bg-slate-300/20 text-[14px]
                cursor-pointer"
            >
                <div className="w-full py-4 px-5">
                    <div>
                        <p className="text-slate-700 text-left text-[1rem] mb-3 dark:text-white">{editorial.title}<span> is pending approval</span></p>
                        <p className="dark:text-white text-left mb-4 text-gray-700 text-[0.8] ">Please confirm</p>
                    </div>
                    <div className="flex gap-x-4 w-full mt-2">
                        <NotifButton 
                            disabled={approvesubmitting} ref={approveelement} 
                            onClick={approveEvent} className="
                            bg-btnprimary duration-200 disabled:cursor-not-allowed
                            text-white dark:text-black dark:bg-white"
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
                            :"approve"
                           }
                        </NotifButton>
                        <NotifButton 
                            disabled={rejectsubmitting} ref={rejectelement}
                            onClick={cancelEvent} className="text-black
                            hover:text-white dark:hover:text-black
                            dark:text-white border hover:shadow-md 
                            dark:hover:bg-white hover:bg-btnprimary
                            px-9 border-slate-400/40 dark:border-slate-200/30">
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