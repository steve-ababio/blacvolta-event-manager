"use client"
import FormControl from "../formcontrol/formcontrol";
import React, { useRef } from "react";

export default function Login(){;
    const username = useRef("");
    const password = useRef("");

    function handleUsername(e:React.FormEvent<HTMLInputElement>){
        const inputelement = e.target as HTMLInputElement;
        username.current = inputelement.value;
    }
    function handlePassword(e:React.FormEvent<HTMLInputElement>){
        const inputelement = e.target as HTMLInputElement;
        password.current = inputelement.value;
    }
    function submitForm(e:React.FormEvent){
        fetch("")
    }
    return (
        <div className="flex justify-center flex-col items-center h-screen">
            <header className="my-10"><h1 className="text-[1.5rem] text-slate-600">Login</h1></header>
            <div className="flex-[7] flex max-w-[30rem] w-full">
                <form className="h-fit w-full gap-y-6 flex px-[60px] flex-col justify-center items-center py-10">
                    <FormControl onChange={handleUsername} type="text" label="username" />
                    <FormControl onChange={handlePassword} type="password" label="password" />
                    <div className="flex w-full ">
                        <button className="w-full py-3 mt-3 focus-visible:ring-blue-400/70 outline-none focus-visible:ring-4 ring-offset-1 text-white bg-blue-600/80 rounded-[5px]">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}