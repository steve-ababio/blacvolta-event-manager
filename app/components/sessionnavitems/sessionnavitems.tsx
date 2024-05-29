import Link from "next/link";
import NotificationContainer from "../noticationcontainer/notificationcontainer";
import ProfileMenuContainer from "../profilemenucontainer/profilemenucontainer";

interface SessionNavItemsProps{
    name:string,
}
export default function SessionNavItems({name}:SessionNavItemsProps){
    return(
        <>
            <div className={`w-full z-40`}>
                <div className="relative w-full flex items-center justify-end">
                    <Link className="flex-row-center sm:rounded-none fixed sm:static bottom-8 right-4 mr-2" href="/event">
                        <span className=" text-slate-600 py-[5px] px-3 rounded-[15px] dark:hover:bg-white hover:text-white dark:hover:text-slate-700 hover:shadow-lg hover:bg-[rgb(50,50,50)] duration-200 dark:text-white hidden sm:inline ">create event</span>
                    </Link>
                    <Link className="flex-row-center sm:rounded-none fixed sm:static bottom-8 right-4 mr-6" href="/blog">
                        <span className="px-3 py-[5px] rounded-[15px] hover:text-white dark:hover:bg-white dark:hover:text-slate-700 hover:bg-[rgb(50,50,50)] hover:shadow-lg duration-200 text-slate-600 dark:text-white hidden sm:inline">create blog</span>
                    </Link>
                    <NotificationContainer />
                    <ProfileMenuContainer name={name}/>
                </div>
            </div>
        </>
    )
}