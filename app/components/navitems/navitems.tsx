import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SessionlessNavItems from "../sessionlessnavitems/sessionlessnavitems";

import SessionNavItemsWrapper from "../sessionnavitemswrapper/sessionnavitemswrapper";

export default async function NavItems(){
    const session = await getServerSession(authOptions);
    return(
        <div className={`grow`}>
            {
                session ? <SessionNavItemsWrapper name="admin" /> : <SessionlessNavItems /> 
            }   
        </div>
    )
}