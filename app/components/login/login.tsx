"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import FormControl from "../formcontrol/formcontrol";
import React, { useRef } from "react";

export interface LoginForm{
    username:string,
    password:string
}
export default function Login(){;

    const{
        register,
        handleSubmit,
        formState:{errors,isSubmitting}
    } = useForm({
        defaultValues:{
            username:"",
            password:""
        }
    });

    const login:SubmitHandler<LoginForm> = (data)=>{
        fetch("")
    }
    return (
        <div className="flex justify-center flex-col items-center h-screen">
            <header className="my-10"><h1 className="text-[1.5rem] text-slate-600">Login</h1></header>
            <div className="flex-[7] flex max-w-[30rem] w-full">
                <form onSubmit={handleSubmit(login)} className="h-fit w-full gap-y-6 flex px-[60px] flex-col justify-center items-center py-10">
                    <div>
                        <label htmlFor="username" className="text-slate-500">username</label>
                        <input {...register("username")} className="form-control"id="username" />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-slate-500">password</label>
                        <input {...register("password")} className="form-control" id="password" />
                    </div>
                    <div className="flex w-full ">
                        <button className="w-full py-3 mt-3 focus-visible:ring-blue-400/70 outline-none focus-visible:ring-4 ring-offset-1 text-white bg-blue-600/80 rounded-[5px]">Login</button>
                    </div>
                </form>

            </div>
        </div>
    )
}