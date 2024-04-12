import Link from "next/link";

export default function NotFound(){
    return(
        <main className="h-screen w-screen flex-col flex justify-center text-slate-600 items-center">
            <h2 className="font-extrabold mb-8 text-[30px] ">There was a problem</h2>
            <p className="mb-4 text-[18px]">We could not find the page you were looking for</p>
            <p className="text-[18px]">Go back to the <Link className="underline text-blue-500" href="/">Login page</Link></p>
        </main>
    )
}