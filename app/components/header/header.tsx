import Link from "next/link";

export default function Header(){
    return(
        <header className="flex px-[1rem] py-[0.5rem] shadow-md items-center gap-x-2 mb-[3rem] justify-between bg-white text-slate-600">
            <h1 className="text-[20px]">Event App</h1>
            <nav>
                <Link className="p-[0.5rem]" href="/dashboard">Event List</Link>
                <Link className="p-[0.5rem]" href="/event">Add Event</Link>
                <Link className="p-[0.5rem]"href="/event">Logout</Link>
            </nav>
        </header>
    )
}
