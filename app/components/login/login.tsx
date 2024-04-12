"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { RotatingLines } from "react-loader-spinner";
import { useRouter } from "next/navigation";

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
            });
            if(response && !response.error){
                router.push("/dashboard");
            }else{
                console.log("loggin")
                setErrorMessage("Invalid credentials");
                console.log("invalid credentials")
            }
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="flex justify-center flex-col items-center h-screen">
            <header className="my-10"><h1 className="text-[1.5rem] text-slate-600">Login</h1></header>
            <div className="flex-[7] flex max-w-[30rem] w-full">
                <form onSubmit={handleSubmit(login)} className="h-fit w-full gap-y-6 flex px-[60px] flex-col justify-center items-center py-10">
                    <div className="w-full">
                        <label htmlFor="username" className="text-slate-500">username</label>
                        <input {...register("username")} className="form-control"id="username" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="password" className="text-slate-500">password</label>
                        <input {...register("password")} className="form-control" type="password" id="password" />
                    </div>
                    <div className="flex w-full ">
                        <button onClick={handleSubmit(login)} className="w-full py-3 flex justify-center items-center mt-3 focus-visible:ring-blue-400/70 outline-none focus-visible:ring-4 ring-offset-1 text-white bg-blue-600/80 rounded-[5px]">
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
            {errormessage && <div className={` duration-700 bg-red-400/20 border ${errormessage ? 'opacity-100 translate-y-0':'opacity-0 translate-y-full'} mb-3 border-red-500 text-slate-600 px-10 rounded-[4px] py-2`}>{errormessage}</div>}
        </div>
    )
}