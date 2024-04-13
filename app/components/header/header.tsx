"use client"
import Link from "next/link";
import MobileNav from "../mobilenav/mobilenav";
import { signOut } from "next-auth/react";

export default function Header(){
    function signout(){
        signOut({callbackUrl:"/"});
    }
    return(
        <header className="flex px-[1rem] py-[0.5rem] shadow-md items-center gap-x-2 mb-[3rem] justify-between bg-white text-slate-600">
            <h1 className="text-[20px]">Event App</h1>
            <nav className="text-slate-500">
                <div className="gap-x-4 hidden md:flex">
                    <Link className="navlink" href="/dashboard"
                    >
                        Events</Link>
                    <Link className="navlink" href="/event">Add Event</Link>
                    <button className="navlink" onClick={signout}>Logout</button>
                </div>
                <MobileNav />
            </nav>
            
        </header>
    )
}
