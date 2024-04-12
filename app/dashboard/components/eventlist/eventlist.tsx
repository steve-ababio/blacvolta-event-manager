import Table, { IEventDetails } from "@/app/components/table/table";
import { prisma } from "@/app/lib/prisma";
export const revalidate = 1; 
export default async function EventList(){
    console.log("event list")
    const events = await prisma.event.findMany({});
    const data:IEventDetails[] = events;
    return(
        <>
            {
                data.length === 0 ?
                <div className="h-full text-[30px] text-slate-600 w-full flex justify-center items-center">There are no events</div>
                :<Table data={data} />
            }
        </>
    )
}