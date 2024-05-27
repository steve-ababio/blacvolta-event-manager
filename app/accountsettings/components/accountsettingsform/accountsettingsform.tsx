"use client"
import { signOut } from "next-auth/react";
import React, { useRef, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { RotatingLines } from "react-loader-spinner";

export default function AccountSettingsForm({username}:{username:string}){
    const usernameelement = useRef<HTMLInputElement>(null);
    const currentpasswordelement = useRef<HTMLInputElement>(null);
    const newpasswordelement = useRef<HTMLInputElement>(null);
    const[editpassword,setEditPassword] = useState(false);
    const[shownewpassword,setShowNewPassword] = useState(false);
    const[passwordupdatemsg,setPasswordUpdateMsg] = useState("");
    const[passwordverifiedmsg,setPasswordVerifiedMsg] = useState("");
    const[usernameupdatemsg,setUsernameUpdateMsg] = useState("");
    const [newusername,setUsername ] = useState("");
    const [usernameloading,setUsernameLoading] = useState(false);
    const [passwordloading,setPasswordLoading] = useState(false);

    async function submitUpdatePassword(){
        setPasswordLoading(true);
        const formdata = new FormData();
        formdata.append("username",username);
        formdata.append("password",newpasswordelement.current!.value);
        let response = await fetch("/api/updatepassword",{body:formdata,method:"PUT"});
        const data = await response.json();
        setPasswordUpdateMsg(data.message);
        setPasswordLoading(false);
        setTimeout(()=>signOut({callbackUrl:"/"}),1500);
    }
    async function submitUpdateUsername(){
        setUsernameLoading(true);
        const formdata = new FormData();
        formdata.append("newusername",newusername);
        formdata.append("oldusername",username)
        let response = await fetch("/api/updateusername",{body:formdata,method:"PUT"});
        const data = await response.json();
        setUsernameLoading(false);
        setUsernameUpdateMsg(data.message);
        signOut({callbackUrl:"/"});
    }
    function handleEditpassword(e:React.ChangeEvent<HTMLInputElement>){
        setEditPassword(e.target.checked);
    }
    async function verifyCurrentPassword(){
        setPasswordLoading(true);
        const formdata = new FormData();
        formdata.append("username",username);
        formdata.append("currentpassword",currentpasswordelement.current!.value);
        const response = await fetch("/api/verifypassword",{body:formdata,method:"POST"});
        const data = await response.json();
        setShowNewPassword(data.matched);
        if(!data.matched){
            setPasswordVerifiedMsg("Incorrect password provided");
        }
        setPasswordLoading(false);
    }
    function handleUserDataSubmit(){
        if(shownewpassword){
            submitUpdatePassword();
        }else{
            verifyCurrentPassword();
        }
    }
    return( 
        <div className="w-[90%] max-w-[50rem] mx-auto flex flex-col h-[calc(100%-60px)]">
            <h1 className="text-[25px] font-bold dark:text-white text-slate-700 py-4">Account Settings</h1>
            <div className="flex-1 mt-12 flex flex-col gap-y-8 relative">
                <div className="shadow-sm rounded-[8px] border border-slate-400/40 w-full py-8 px-10">
                    <h2 className="font-bold dark:text-white  text-slate-700 text-[19px]">Username</h2>
                    <p className="dark:text-white text-slate-500 py-2">Please enter the username you want to use.</p>
                    <input onChange={(e)=>setUsername(e.target.value)} className=" 
                        px-4 border dark:text-slate-200
                        dark:bg-transparent focus:ring-2 dark:border-slate-300/50
                        disabled:cursor-not-allowed border-slate-300/80
                        text-slate-600 duration-300  focus:ring-blue-400
                        rounded-[5px] w-full py-2 outline-none" 
                        type="text"  name="username" defaultValue={username} 
                    />
                    {usernameupdatemsg != "" && <div className="rounded-[5px] py-2 dark:text-white text-slate-600 flex items-center gap-x-2"><BiInfoCircle  className="text-slate-500 dark:text-white" size={25}/>{usernameupdatemsg}</div>}
                    <div>
                        <button onClick={submitUpdateUsername} className="
                            px-10 py-2 bg-black dark:bg-white text-white mt-3 flex
                            dark:text-slate-700  outline-none focus-visible:ring-offset-2
                            rounded-[6px] focus-visible:ring-2 focus-visible:ring-blue-400
                            items-center justify-center"
                        >
                            {
                                usernameloading ? 
                                <>
                                    <RotatingLines 
                                        strokeColor="black" 
                                        strokeWidth="4"
                                        animationDuration="0.8"
                                        width="25"
                                        visible={true} />
                                        <span>  saving username</span>
                                </>
                                :"Save Username"
                            }
                        </button>
                    </div>
                </div>
                <div className="flex items-center">
                    <input onChange={handleEditpassword} 
                        type="checkbox" name="editpassword"
                        id="editpassword" 
                        className="mr-4 rounded-[5px] accent-black
                        bg-transparent h-5 w-5 dark:accent-white"
                    />
                    <label htmlFor="editpassword">Change password</label>
                </div>
                {   
                    editpassword && <div className="shadow-sm w-full border border-slate-400/40 rounded-[8px] py-8 px-10">
                        <h2 className="font-bold dark:text-white text-slate-700 text-[19px]">Password</h2>
                        <label htmlFor="currentpassword" className="dark:text-white text-slate-500 py-2 block">Please enter current password</label>
                        <input ref={currentpasswordelement}
                            id="currentpassword"
                            className="
                                px-4 border dark:text-slate-200
                                dark:bg-transparent  focus:ring-2 dark:border-slate-300/50
                                disabled:cursor-not-allowed border-slate-300/80
                                text-slate-600 duration-300  focus:ring-blue-400
                                rounded-[5px] w-full py-2 outline-none" 
                            type="password" name="password" 
                        />
                        {
                            shownewpassword ?
                                <div className="mt-3">
                                    <label htmlFor="newpassword" className="dark:text-white text-slate-500 py-2 block">Please enter new password</label>
                                    <input ref={newpasswordelement}
                                        id="newpassword"
                                        className="
                                            px-4 border dark:text-slate-200
                                            dark:bg-transparent  focus:ring-2 dark:border-slate-300/50
                                            disabled:cursor-not-allowed border-slate-300/80
                                            text-slate-600 duration-300  focus:ring-blue-400
                                            rounded-[5px] w-full py-2 outline-none" 
                                        type="password" name="password" 
                                    />
                                </div>
                            :
                            passwordverifiedmsg != "" && <div className="rounded-[5px] py-2 dark:text-white text-slate-600 flex items-center gap-x-2"><BiInfoCircle  className="text-slate-500 dark:text-white" size={25}/>{passwordverifiedmsg}</div>
                        }
                        {passwordupdatemsg != "" && <div className="rounded-[5px] py-2 dark:text-white text-slate-600 flex items-center gap-x-2"><BiInfoCircle  className="text-slate-500 dark:text-white" size={25}/>{passwordupdatemsg}</div>}
                        <div>
                            <button onClick={handleUserDataSubmit} className="
                                px-10 py-2 bg-black dark:bg-white text-white mt-3 flex-row-center
                            dark:text-slate-700  outline-none focus-visible:ring-offset-2
                                rounded-[6px] focus-visible:ring-2 focus-visible:ring-blue-400"
                            >

                                {
                                     passwordloading ? 
                                     <>
                                         <RotatingLines 
                                             strokeColor="black" 
                                             strokeWidth="4"
                                             animationDuration="0.8"
                                             width="25"
                                             visible={true} />
                                             <span>{shownewpassword ? "saving new password":"verifying password"}</span>
                                     </>
                                     :(shownewpassword ? "save new password" : "verify current password")
                                }
                            </button>
                        </div>
                    </div>
                }
            </div>
            
        </div>
    )
}