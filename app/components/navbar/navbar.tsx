import Image from "next/image";
import Link from "next/link";
import NavItems from "../navitems/navitems";


export default async function NavBar({pagetitle}:{pagetitle:string}){
    return(
        <nav className="h-[60px] dark:border-b-slate-200/20 border-b-slate-400/40  border-b dark:bg-darkprimary bg-white">
            <div className="flex h-full w-[90%] mx-auto justify-between items-center">
                <header>
                    <Link className="cursor-pointer flex items-center gap-x-2" href="/">
                        <div className="w-[30px]">
                            <Image alt="website logo" className="object-contain dark:invert-0 dark:mix-blend-lighten invert mix-blend-darken aspect-[15/16]" width={60} height={60}  src="/assets/images/logo.png" priority />
                        </div>
                        <div className="text-slate-500 dark:text-white flex items-center">/</div>
                        <div className="text-slate-500 dark:text-white font-semibold flex items-center">{pagetitle}</div>
                    </Link>
                </header>
                <NavItems />
            </div>
        </nav>
    )
}