import { IconType } from "react-icons"
import { twMerge } from "tailwind-merge"

interface ProfileMenuItemProps extends React.HTMLAttributes<HTMLButtonElement>{
    onclick?:()=>void,
    Icon:IconType,
    label:string
    size?:number
}

export default function ProfileMenuItem({onclick,Icon,className, label,size=20}:ProfileMenuItemProps){
    return(
        <button onClick={onclick} className={twMerge(`sm:py-[4px] py-2 text-slate-600 dark:text-slate-200 px-2 dark:hover:bg-blue-500/30 hover:bg-blue-300/30 rounded-md w-full flex justify-between`,className)}>
            <span className="text-[16px]">{label}</span>
            <Icon className="text-center dark:text-slate-200 text-slate-500" size={size} />
        </button>
    )
}