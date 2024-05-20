import React, { useId } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { IEventForm } from "../eventform/eventform";
import Error from "../error/error";

interface FormControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label:string,
    type:"text"|"password"|"time"|"date"|"tel",
    register:UseFormRegister<IEventForm>,
    errormessage?:string,
    name:keyof IEventForm,
    validationrules?:RegisterOptions<IEventForm> | undefined,
}

const FormControl = ({register,name,label,defaultValue,type,onChange,className,disabled,errormessage="",validationrules}:FormControlProps)=> {
    const controlId = useId();
    return(
        <div className={`w-full ${disabled ? 'opacity-50': ''} pb-3`}>
            <label htmlFor={controlId} className={`text-slate-500 dark:text-slate-200 ${disabled ? 'cursor-not-allowed': ''}`}>{label}</label>
            <input 
                {...register(name,validationrules)} 
                disabled={disabled} defaultValue={defaultValue} 
                onChange={onChange} 
                className={twMerge(`border dark:text-slate-200 dark:bg-transparent mb-2 disabled:cursor-not-allowed border-slate-300/80 focus:ring-2 outline-none text-slate-600 duration-300 px-4 focus:ring-black dark:focus:ring-white rounded-[5px] w-full py-2`,className)}
                type={type} id={controlId}
            />
            {(errormessage != "" || errormessage !== undefined) && <Error message={errormessage!} errortype="danger"/>}
        </div>
    )
}
export default FormControl;