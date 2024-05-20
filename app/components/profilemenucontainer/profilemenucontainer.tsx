"use client"
import { useEffect, useRef, useState } from "react";
import { LiaUserCircle } from "react-icons/lia";
import { PiCaretDownLight } from "react-icons/pi";
import ProfileMenu from "../profilemenu/profilemenu";

export default function ProfileMenuContainer({name}:{name:string}){
    const [menuvisible,setMenuVisible] = useState(false);
    const profilemenuref = useRef<HTMLDivElement>(null);
    function showMenu(){
        setMenuVisible(!menuvisible);
    }
    useEffect(()=>{
        window.addEventListener("click",closeMenu);
        return ()=>(
            window.removeEventListener("click",closeMenu)
        )
    },[]);

    function closeMenu(e:MouseEvent){
        if(!profilemenuref.current!.contains(e.target as HTMLElement)){
            setMenuVisible(false);
        }
    }
    return(
        <div ref={profilemenuref} className="relative  text-slate-500 dark:text-slate-300 ">
            <button className="flex items-center ml-[2px]" onClick={showMenu}>
                <LiaUserCircle className="text-slate-500 dark:text-slate-300" size={30}/>
                <PiCaretDownLight size={13} className={`${menuvisible && `rotate-180`} transition-transform duration-300 dark:text-slate-200 text-gray-600`}/>
            </button>
            <ProfileMenu name={name} visible={menuvisible} />
        </div>
    )
}