"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import FormControl from "../../components/formcontrol/formcontrol";
import { RotatingLines } from "react-loader-spinner";
import { useEffect, useRef, useState} from "react";
import Error from "../error/error";
import Select from "../select/select";
import { toast,Slide } from "react-toastify";
import { BsFolderPlus } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { IoImageOutline } from "react-icons/io5";

export interface IEventForm{
    eventname:string,
    eventdate:string,
    eventtime:string,
    ticketlinks:string
    inquirynumber:string,
    eventdescription:string,
    sociallinks:string,
    eventflyer?:FileList,
    eventvenue:string
}
const options = {
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"]
};

function formatTime(hourstring:string){
    let meridian = "";
    let hour = parseInt(hourstring, 10);
    if(hour > 12){
        meridian = "PM";
        hour -= 12;
    }else if(hour < 12){
        meridian = "AM";
        if(hour === 0){
            hour = 12;
        }
    }else{
        meridian = "PM";
    }
    return[hour,meridian]
}

export default function EventForm(){
    const {data} = useSession();
    const file = useRef<File>();
    const autocompleteref = useRef<google.maps.places.Autocomplete>();
    const inputref = useRef<HTMLInputElement|null>(null);
    const selectref = useRef<HTMLSelectElement>(null);
    const venue = useRef<string>("");
    const [iseventweekly,setIsEventWeekly] = useState(false);
    const [fileloadedmessage,setFileLoadedMessage] = useState("");

    const{
        register,
        handleSubmit,
        clearErrors,
        formState:{isSubmitting,errors},
    } = useForm<IEventForm>();

    const {ref,...rest} = register("eventvenue",{required:"Event venue is required"});
    useEffect(function(){
        autocompleteref.current = new window.google.maps.places.Autocomplete(inputref.current!,options);
        autocompleteref.current.addListener("place_changed",getPlace);
    },[]);

    async function getPlace(){
        const place = await autocompleteref.current!.getPlace();
        venue.current = `${place.name}`;
        if(errors.eventvenue!.message!.length > 0)
            clearErrors("eventvenue")
    }

    const submitFormData:SubmitHandler<IEventForm> = async(formeventdata)=>{
        const [hourstring,minute] = formeventdata.eventtime.split(":");
        const [hour,meridian] = formatTime(hourstring);
        const eventtime = `${hour}:${minute} ${meridian}`;
        const user = data?.user as {id:string,name:string};
        let selecteddayofweek = (selectref.current) ? selectref.current!.value : "";

        const formdata = new FormData();
        for(const [key,value] of Object.entries(formeventdata)){
            if(key != "eventtime"){
                if(key === "eventflyer"){
                    formdata.append(key,value[0]);
                    continue;
                }
                formdata.append(key,value);
            }
        }
        formdata.append("eventtime",eventtime);
        formdata.append("dayofweek",selecteddayofweek);
        formdata.append("adminUserId",user.id);
        formdata.append("iseventweekly",JSON.stringify(iseventweekly));

        const response = await fetch("/api/createevent",{method: "POST",body:formdata});
        const {message} = await response.json();
        toast.success(message,{
            transition:Slide
        });
    }
    function obtainImageFile(e:React.ChangeEvent<HTMLInputElement>){
       if(e.target.files && e.target.files.length){
            setFileLoadedMessage(e.target.files[0].name)
            file.current = e.target.files[0];
       }
    }
    function checkEventIsWeekly(e:React.ChangeEvent<HTMLInputElement>){
        setIsEventWeekly(e.target.checked);
    }
    return(
        <form onSubmit={handleSubmit(submitFormData)} className="flex flex-col bg-white dark:bg-[#191C20] gap-y-5">
             <div className="h-fit my-3">
                <input 
                    id="image" className="w-0 h-0 overflow-hidden peer"
                    {...register("eventflyer",{required:"Event flyer image is required"})}
                    onChange={e=>{clearErrors("eventflyer");obtainImageFile(e)}} type="file"
                    aria-required="true" accept="image/*"
                />
                <label htmlFor="image" className="
                    cursor-pointer inline-flex border mb-[6px]
                    border-slate-400/60 shadow-sm dark:peer-focus:ring-white
                    dark:border-blue-200/20 w-fit peer-focus:ring-black
                    px-4 py-2 gap-x-3 rounded-[8px] peer-focus:ring-2
                  dark:text-slate-200 text-slate-500"
                >
                    <BsFolderPlus size={25} />
                    <span>Select image</span>
                </label>
                {fileloadedmessage != "" && <div className="rounded-[5px] dark:text-white text-slate-600 flex items-center gap-x-2"><IoImageOutline  className="dark:text-white text-slate-500" size={25}/>{fileloadedmessage}</div>}
                {( errors.eventflyer?.message != undefined) && <Error message={errors.eventflyer?.message!} errortype = "danger" />}
            </div>
            <FormControl 
                onChange={()=>clearErrors("eventname")}
                register={register}
                validationrules={{required:"Event Name is required"}}
                name="eventname"
                aria-required="true" type="text" label="Event Name"
                errormessage={errors.eventname?.message}
            />
            <div className="flex items-center gap-x-4">
                <input 
                    id="isweekly" 
                    onChange={checkEventIsWeekly}
                    type="checkbox" name="isweekly" 
                    className="h-5 w-5 focus:ring-2 dark:focus:ring-white focus:ring-black" 
                />
                <label htmlFor="isweekly" className="dark:text-slate-200 text-slate-600">Does event recur weekly?</label>
            </div>
            {
                iseventweekly && <Select ref={selectref} selectedvalue="0"  />
            }
            {
                !iseventweekly && <FormControl 
                    register={register}
                    onChange={()=>clearErrors("eventdate")}
                    validationrules={{required:"Event Date is required"}}
                    name="eventdate"
                    aria-required="true" type="date" label="Event Date" 
                    errormessage={errors.eventdate?.message}
                    disabled ={iseventweekly}
                />
            }
            <FormControl 
                register={register}
                validationrules={{required:"Event time is required"}}
                onChange={()=>clearErrors("eventtime")}
                name="eventtime"  
                aria-required="true" type="time" label="Event Time"
                errormessage={errors.eventtime?.message}
            />
            <div>
                <label className="text-slate-500 dark:text-slate-200">Venue</label>
                <input 
                    {...rest}
                    name="eventvenue"
                    aria-required="true" 
                    ref={(e)=>{
                        ref(e)
                        inputref.current = e;
                    }}
                    className="
                        form-control focus:ring-2 dark:focus:ring-white
                      focus:ring-black text-slate-600
                      dark:text-slate-200 mb-2 dark:bg-transparent
                    " 
                />
                {( errors.eventvenue?.message != undefined) && <Error message={errors.eventvenue?.message!} errortype = "danger" />}
            </div>
            <FormControl 
                register={register}
                name="ticketlinks"
                type="text" label="Ticket Links:" 
            />
            <FormControl 
                register={register}
                name="inquirynumber"
                type="tel" label="Inquiry Number:"
            />
            <div>
                <label htmlFor="description" className="text-slate-500 dark:text-slate-200">Description</label>
                <textarea 
                    {...register("eventdescription",)}
                    rows={3} id="description" className="
                    py-2 dark:text-slate-200 px-4 
                    dark:bg-transparent block border border-slate-300/80
                     focus:ring-2 dark:focus:ring-white
                    focus:ring-black rounded-[5px] outline-none w-full"/>
            </div>
            <FormControl 
                register={register}
                name="sociallinks"
                type="text" label="Social Link"
            />
            <button 
                disabled={isSubmitting}
                className={`
                    bg-black dark:bg-white flex justify-center 
                    items-center text-white w-fit px-5 
                    py-2 rounded-md mb-4 dark:text-slate-600
                    ${isSubmitting?'opacity-50 cursor-not-allowed':''}
                    `}
                    onClick={handleSubmit(submitFormData)}>
                    {
                        isSubmitting ? 
                            <>
                                <RotatingLines 
                                    strokeColor="white" 
                                    strokeWidth="4"
                                    animationDuration="0.8"
                                    width="20"
                                    visible={true} 
                                />
                                <span className="text-[14px]">Adding event</span> 
                            </>
                            :<span className="text-[14px]">Add Event</span>
                    }
            </button>
    </form>
    )
}