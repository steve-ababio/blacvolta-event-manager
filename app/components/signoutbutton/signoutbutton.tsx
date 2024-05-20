import { signOut } from "next-auth/react";

export default function SignOutButton(){
    function signout(){
        signOut({callbackUrl:"/",redirect:true});
    }
    return(
        <button className="navlink" onClick={signout}>Logout</button>
    )
}