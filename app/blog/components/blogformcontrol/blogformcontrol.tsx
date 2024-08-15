import React, { useId } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import Error from "../../../components/error/error";

export type BlogFormType = {
    authorname:string,
    blogtitle:string,
    datewritten:string,
    blogimage:FileList,
}
interface FormControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label:string,
    type:"text"|"date",
    register:UseFormRegister<BlogFormType>,
    errormessage?:string,
    name:keyof BlogFormType,
    validationrules?:RegisterOptions<BlogFormType> | undefined,
    controlname?:string
}

const BlogFormControl = ({register,name,label,type,onChange,className,disabled,errormessage="",validationrules}:FormControlProps)=> {
    const controlId = useId();
    return(
        <div className={`w-full ${disabled ? 'opacity-50': ''} pb-4`}>
            <label htmlFor={controlId} className={`text-slate-500 dark:text-slate-200 ${disabled ? 'cursor-not-allowed': ''}`}>{label}</label>
            <input 
                {...register(name,validationrules)} 
                disabled={disabled} 
                onChange={onChange} 
                className={twMerge(`border dark:text-slate-200 dark:bg-transparent mb-2 disabled:text-gray-200/20 disabled:border-gray-200/20 disabled:cursor-not-allowed border-slate-300/80 focus:ring-2 outline-none text-slate-600 duration-300 px-4 dark:focus:ring-white focus:ring-black rounded-[5px] w-full py-2`,className)}
                type={type} id={controlId}
            />
            {(errormessage != "" || errormessage !== undefined) && <Error message={errormessage!} errortype="danger"/>}
        </div>
    )
}
export default BlogFormControl;