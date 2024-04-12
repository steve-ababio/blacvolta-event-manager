import { getServerSession } from "next-auth";
import EventForm from "../components/eventform/eventform";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AddEvent(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/")
    }
    return(
        <div className="bg-white w-[80%] mx-auto max-w-[50rem] text-slate-600 ">
            <EventForm />
        </div>
    )
}