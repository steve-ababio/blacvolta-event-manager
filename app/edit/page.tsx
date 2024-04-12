import { IEventDetails } from "../components/table/table";
import EditEventForm from "../components/editform/editform";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";

export default async function EditEvent({searchParams}:{searchParams:IEventDetails}){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/")
    }
    return (
        <>
            <EditEventForm {...searchParams}/>
        </>
    )
}