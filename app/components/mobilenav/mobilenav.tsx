"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";

export default function MobileNav(){
    const [show,setShow] = useState(false);
    function signout(){
        signOut({callbackUrl:"/",redirect:true});
    }
    
    return(
        <div className="relative w-[15rem] md:w-fit flex justify-end">
            {show ?
                <button className="cursor-pointer px-3 md:hidden" onClick={()=>setShow(!show)}>
                    <CgClose size={25} color="olor: rgb(71 85 105)" />
                </button>
                :<button className="cursor-pointer px-3 md:hidden" onClick={()=>setShow(!show)}>
                    <RxHamburgerMenu size={25} color="olor: rgb(71 85 105)" />
                </button>
            }
            <div className={`px-3 flex gap-x-4 flex-col md:hidden absolute top-[calc(100%+8px)] ${show ?'scale-100':'scale-0'} duration-300 shadow-md bg-white`}>
                <Link className="navlink" href="/dashboard"
                    >
                    Event List</Link>
                <Link className="navlink" href="/event">Add Event</Link>
                <button className="navlink" onClick={signout}>Logout</button>
            </div>
        </div>
    )
}