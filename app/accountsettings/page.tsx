import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";
import AccountSettingsForm from "./components/accountsettingsform/accountsettingsform";
import NavBar from "../components/navbar/navbar";

export default async function AccountSettings(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/")
    }
    const userdata = session.user as {username:string};
    const username = userdata.username;
    
    return(
        <main className="flex flex-col h-screen dark:bg-transparent bg-white">
            <NavBar pagetitle="account settings" />
            <AccountSettingsForm username={username} />
        </main>
    )
}