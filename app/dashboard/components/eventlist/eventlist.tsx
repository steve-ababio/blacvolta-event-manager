import Table, { IEventDetails } from "@/app/components/table/table";

export default async function EventList(){
    const response = await fetch("https://blacvolta.com/api.php");
    const data:IEventDetails[] = await response.json();
    return(
        <>
            <Table data={data} />
        </>
    )
}