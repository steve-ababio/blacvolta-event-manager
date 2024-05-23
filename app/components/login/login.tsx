"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { RotatingLines } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import Error from "../error/error";

export interface LoginForm{
    username:string,
    password:string
}
export default function Login(){;
    const router = useRouter();
    const [errormessage,setErrorMessage] = useState("");
    const{
        register,
        handleSubmit,
        formState:{isSubmitting}
    } = useForm({
        defaultValues:{
            username:"",
            password:""
        }
    });

    const login:SubmitHandler<LoginForm> = async (data)=>{
        const {username,password} = data;
        try{
            const response = await signIn("credentials",{
                username,
                password,
                redirect:false,
                callbackUrl:"/dashboard"
            });
            if(! response!.ok && response!.error){
                setErrorMessage("Incorrect username or password");
            }else{
                router.push("/dashboard");
            }
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="flex justify-center flex-col items-center h-screen ">
            <header className="my-10"><h1 className="text-[1.5rem] text-slate-600 dark:text-slate-200">Login</h1></header>
            <div className="flex-[7] flex max-w-[25rem] w-full">
                <div className="px-[60px] w-full h-fit  py-3 flex flex-col justify-center rounded-[10px] border border-slate-300/50">
                    {errormessage != "" && <Error message={errormessage} errortype="danger"/>}
                    <form onSubmit={handleSubmit(login)} className="
                         text-slate-500 w-full gap-y-6 flex h-full
                        flex-col justify-center items-center pt-5 pb-10"
                    >
                        <div className="w-full">
                            <label className="text-slate-600 dark:text-slate-200" htmlFor="username">username</label>
                            <input {...register("username")} className="form-control  dark:bg-transparent text-slate-600 dark:text-slate-200"id="username" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="password" className="text-slate-600 dark:text-slate-200">password</label>
                            <input {...register("password")} className="form-control dark:bg-transparent text-slate-600 dark:text-slate-200" type="password" id="password" />
                        </div>
                        <div className="flex w-full ">
                            <button onClick={handleSubmit(login)} className="
                                w-full py-2 flex justify-center items-center 
                                mt-3 focus-visible:ring-blue-400/70 outline-none
                                focus-visible:ring-4 ring-offset-1 text-white
                                bg-blue-500 duration-150 hover:bg-blue-600/80
                                rounded-[5px]">
                            {
                                isSubmitting ?
                                    <>
                                        <RotatingLines 
                                            strokeColor="white" 
                                            strokeWidth="4"
                                            animationDuration="0.8"
                                            width="25"
                                            visible={true} 
                                        />
                                        <span>signing in </span>
                                    </>
                                :"sign in"
                            }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
}