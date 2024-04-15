import { IEventDetails } from "../components/table/table";
import EditEventForm from "../components/editform/editform";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function EditEvent({searchParams}:{searchParams:IEventDetails}){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/")
    }
    return (
        <>
            <ToastContainer 
                position="top-center"
                theme="light"
                hideProgressBar={true}
                autoClose={5000}
            />
            <EditEventForm {...searchParams}/>
            
        </>
    )
}