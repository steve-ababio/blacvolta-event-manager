import { getServerSession } from "next-auth";
import EventList from "./components/eventlist/eventlist";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";
export const revalidate = 0; 

export default async function Dashboard(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/")
    }
    
    return(
        <>
            <main className="h-full text-slate-600">
                <Suspense fallback={<div>loading</div>}>
                    <EventList />
                </Suspense>
            </main>
        </>
    )
}