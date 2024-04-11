import React, { useId } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { EventForm } from "../eventform/eventform";

interface FormControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label:string,
    type:"text"|"password"|"time"|"date"|"file",
    register:UseFormRegister<EventForm>,
    name:keyof EventForm,
    validationrules?:RegisterOptions<EventForm> | undefined,
}

export default function FormControl({register,name,label,defaultValue,type,onChange,className,validationrules}:FormControlProps) {
    const controlId = useId();
    return(
        <div className="w-full">
            <label htmlFor={controlId} className="text-slate-500">{label}</label>
            <input {...register(name,validationrules)} defaultValue={defaultValue} onChange={onChange} className={twMerge(`border border-slate-300/80 focus:ring-2 outline-none text-slate-600 duration-300 px-4 focus:ring-blue-400 rounded-[5px] w-full py-2`,className)} type={type} id={controlId}/>
        </div>
    )
}