import { getServerSession } from "next-auth";
import EventList from "./components/eventlist/eventlist";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";
import NavBar from "../components/navbar/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

export default async function Dashboard(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/")
    }
    return(
        <main className="h-full">
            <NavBar pagetitle="Dashboard" />
            <div className=" h-[calc(100%-60px)] flex flex-col dark:bg-darkprimary w-full">
                <ToastContainer 
                    position="top-center"
                    theme="light"
                    hideProgressBar={true}
                    autoClose={5000}
                />
                <Suspense fallback={
                    <div className="
                        h-full w-full flex justify-center
                        items-center text-slate-600
                        dark:text-white text-[20px]"
                    >
                        Loading events
                    </div>} 
                >
                    <EventList />
                </Suspense>
                
            </div>
        </main>
    )
}