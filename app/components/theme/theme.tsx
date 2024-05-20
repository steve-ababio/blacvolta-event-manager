"use client"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { PiMonitor, PiMoonLight } from "react-icons/pi";
import { RiExpandUpDownLine } from "react-icons/ri";

type Theme = "system"|"dark"|"light";

export default function ThemeManager({visible}:{visible: boolean}){
    const {theme,setTheme} = useTheme();
    const [mounted,setMounted] = useState(false);

    useEffect(function(){
        setMounted(true);
    },[]);
    function selectTheme(e:React.ChangeEvent<HTMLSelectElement>){
        const selectedtheme = e.target.value as Theme;
        setTheme(selectedtheme);
    }
    if(!mounted) return null;
    return(
        <div className="sm:py-[4px] py-2 px-2 text-slate-600 dark:text-slate-200 hover:bg-blue-300/30 dark:hover:bg-blue-500/30 rounded-md w-full flex justify-between">
            <span>theme</span>
            <div className="text-[14px] text-slate-600 dark:text-white relative w-fit flex items-center">
                <span className="absolute left-[5px] pointer-events-none">
                    {theme === "system" && <PiMonitor className="dark:text-slate-200 text-slate-500" size={17}/>}
                    {theme === "dark" && <PiMoonLight  className="dark:text-slate-200 text-slate-500" size={17}/>}
                    {theme ==="light" && <MdOutlineLightMode className={`dark:text-slate-200 text-slate-500 ${visible ? 'anim-spin':''} duration-700`} size={17}/>}
                </span>
                <select onChange={selectTheme} defaultValue={theme} className="outline-none focus:ring-1 text-slate-600 dark:text-slate-200 cursor-pointer dark:bg-[#191C20] focus:ring-blue-400 border appearance-none border-stone-400/50 px-6 py-[3px] rounded-[5px]">
                    <option value="system">System</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                </select>
                <span className="absolute right-[5px] pointer-events-none">
                    <RiExpandUpDownLine className="text-slate-400" size={17}/>
                </span>
            </div>
        </div>
    )
}