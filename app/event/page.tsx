import { getServerSession } from "next-auth";
import EventForm from "../components/eventform/eventform";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/navbar/navbar";

export default async function AddEvent(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/")
    }
    return(
        <>
        <NavBar pagetitle="Create event" />
        <main className=" bg-white dark:bg-transparent pt-1 min-h-screen w-full">
            <div className="bg-white w-[80%] mt-12 mx-auto max-w-[50rem] text-slate-600 ">
                <ToastContainer 
                    position="bottom-center"
                    theme="light"
                    hideProgressBar={true}
                    autoClose={5000}
                />
                <EventForm />
            </div>
        </main>
        </>
    )
}