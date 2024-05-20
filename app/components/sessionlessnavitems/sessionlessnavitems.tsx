import Link from "next/link";

export default function SessionlessNavItems(){
    return(
        <>
            <Link href="/login">
                <button className="
                    px-7 rounded-md py-[6px] text-slate-600 
                    duration-200 hover:bg-blue-400/80 hover:ring-2
                    hover:ring-blue-500 hover:text-white"
                >
                    login
                </button>
            </Link>
            <Link href="/signup">
                <button className="
                    px-6 rounded-md py-[6px] bg-blue-400
                    hover:text-slate-600
                    hover:bg-blue-200 hover:ring-2 duration-200
                    hover:ring-blue-500 text-white">
                    signup
                </button>
            </Link>
        </>
    )
}