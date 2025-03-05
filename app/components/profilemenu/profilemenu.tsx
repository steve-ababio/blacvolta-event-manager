import { signOut } from "next-auth/react";
import ProfileMenuItem from "../profilemenuitem/profilemenuitem";
import Link from "next/link";
import React from "react";
import { TbExternalLink } from "react-icons/tb";;
import { AiOutlinePoweroff } from "react-icons/ai";
import ThemeManager from "../theme/theme";
import { PiCalendarPlusLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineEditNote } from "react-icons/md";

interface ProfileMenuProps{
    visible:boolean,
    name:string,
}

const ProfileMenu = ({visible,name}:ProfileMenuProps)=>{
    function signout(){
        signOut({callbackUrl:"/"});
    }
    return(
        <div role="menu" aria-hidden={visible} className={`
            fixed sm:mt-2 sm:rounded-[10px] bottom-0 right-0 left-0 sm:bottom-auto h-[calc(100%-60px)]
            sm:absolute sm:-translate-x-full sm:left-[100%] sm:top-full sm:min-w-[15rem] 
            transition duration-200 shadow-sm bg-white dark:bg-darkprimary sm:h-auto
            ${visible ? 'opacity-100 scale-100':'opacity-0 scale-0'} min-w-screen
             py-4 border-slate-400/30 z-[100] dark:text-slate-200 border
            dark:border dark:border-slate-100/10 `
        }
        >
            <div className="w-[80%] flex flex-col pt-3 sm:pt-0 gap-y-2 sm:gap-y-1 h-full mx-auto">
                <div>
                    <div className="text-slate-700 px-2 text-[16px] dark:text-slate-200">
                        {name}
                    </div>
                    <hr className="text-slate-300"/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Link href="/blog" >
                        <ProfileMenuItem Icon={FiEdit} size={20} label="create blog" />
                    </Link>
                    <Link href="/event" >
                        <ProfileMenuItem Icon={PiCalendarPlusLight} size={25} label="create event" />
                    </Link>
                    <hr/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Link href="/accountsettings">
                        <ProfileMenuItem Icon={IoSettingsOutline} size={25} label="account settings" />
                    </Link>
                    <ThemeManager visible={visible} />
                     <hr/>
                </div>
                <div className="flex flex-col gap-y-2 grow">
                    <Link href="/dashboard" className="sm:mb-0"><ProfileMenuItem Icon={TbExternalLink} size={25} label="events" /></Link>
                    <Link href="/blogposts" className="mb-auto sm:mb-0"><ProfileMenuItem Icon={MdOutlineEditNote} size={28} label="blogs" /></Link>
                    <ProfileMenuItem className=" py-4 sm:py-2 border border-slate-400/30 sm:border-0" onclick={signout} Icon={AiOutlinePoweroff} label="signout" />
                </div>
            </div>
        </div>
    )
};

ProfileMenu.displayName = "ProfileMenu";
export default ProfileMenu;