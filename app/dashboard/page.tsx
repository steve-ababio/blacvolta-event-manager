import EventList from "./components/eventlist/eventlist";
import { Suspense } from "react";

export default function Dashboard(){
    
    return(
        <>
            <main className="text-slate-600 sm:max-w-[540px] md:max-w-[720px] lg:max-w-[1140px] mx-auto">
                <h2 className="text-[20px]">Event List</h2>
                <Suspense fallback={<div>loading</div>}>
                    <EventList />
                </Suspense>
            </main>
        </>
    )
}