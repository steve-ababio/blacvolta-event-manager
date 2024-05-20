import SessionNavItems from "../sessionnavitems/sessionnavitems";

interface SessionNavItemsProps{
    name:string, 
}

export default async function SessionNavItemsWrapper({name}:SessionNavItemsProps){
    return(
        <>
            <SessionNavItems  name={name}/>
        </>
    )

}