import EditEventForm from "../components/editform/editform";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/navbar/navbar";
import { IEventDetails } from "../constants/constants";

export default async function EditEvent({searchParams}:{searchParams:IEventDetails}){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/")
    }
    return (
        <>
            <NavBar pagetitle="Edit event"/>
            <main className="dark:bg-darkprimary pt-2 bg-white min-h-screen w-full">
                <ToastContainer 
                    position="top-center"
                    theme="light"
                    hideProgressBar={true}
                    autoClose={5000}
                />
                <EditEventForm {...searchParams}/>
            </main>
        </>
    )
}