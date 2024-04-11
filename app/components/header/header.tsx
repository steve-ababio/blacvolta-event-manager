import Link from "next/link";
import MobileNav from "../mobilenav/mobilenav";

export default function Header(){
    return(
        <header className="flex px-[1rem] py-[0.5rem] shadow-md items-center gap-x-2 mb-[3rem] justify-between bg-white text-slate-600">
            <h1 className="text-[20px]">Event App</h1>
            <nav>
                <div className="gap-x-4 hidden md:flex">
                    <Link className="navlink" href="/dashboard"
                    >
                        Event List</Link>
                    <Link className="navlink" href="/event">Add Event</Link>
                    <Link className="navlink"href="/event">Logout</Link>
                </div>
                <MobileNav />
            </nav>
            
        </header>
    )
}
