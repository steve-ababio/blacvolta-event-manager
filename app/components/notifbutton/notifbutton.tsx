"use client"
import React from "react"
import { twMerge } from "tailwind-merge"

interface NotifButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
}
const NotifButton = React.forwardRef<HTMLButtonElement,NotifButtonProps>(({className,disabled,onClick,children}:NotifButtonProps,ref)=>{
    return(
        <button disabled={disabled} ref={ref} onClick={onClick} className={twMerge(`px-8 rounded-[4px] py-[5px] gap-x-2 flex items-center`,className)}>
            {children}
        </button>
    )
})

export default NotifButton;

NotifButton.displayName = "NotifButtonProps";