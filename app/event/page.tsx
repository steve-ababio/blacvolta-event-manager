import { getServerSession } from "next-auth";
import EventForm from "../components/eventform/eventform";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";

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