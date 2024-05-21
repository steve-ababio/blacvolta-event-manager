"use client"
import { useForm,SubmitHandler} from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { IEventForm } from "../eventform/eventform";
import { Slide, toast } from "react-toastify";
import Select from "../select/select";
import { BsFolderPlus } from "react-icons/bs";
import FormControl from "../formcontrol/formcontrol";
import { IEventDetails } from "@/app/constants/constants";
import { IoImageOutline } from "react-icons/io5";

function convertTime(EventTime:string){
    const [time,meridian] = EventTime.split(" ");
    const [hourstring,min] = time.split(":");
    let hourvalue = parseInt(hourstring,10);
    let hour = `0${hourvalue}`;
    if(meridian === "PM" && hourvalue != 12){
        hourvalue += 12; 
        hour = `${hourvalue}`;
    }
    if(meridian === "AM" && hourvalue === 12){
        hourvalue -= 12;
        hour = `0${hourvalue}`
    }
    
    return `${hour}:${min}`;
}
export default function EditEventForm(props:IEventDetails){
    const {Id,EventName,EventDate,FlyerImagePath,IsEventWeekly,DayofWeek,SocialLinks,EventTime,Venue,TicketLinks,InquiryNumber,Description} = props;
    const autocompleteref = useRef<google.maps.places.Autocomplete>();
    const inputref = useRef<HTMLInputElement|null>(null);
    const dayofweek = useRef("");
    const checkbox = useRef<HTMLInputElement>(null);
    const venue = useRef<string>(Venue);
    const selectref = useRef<HTMLSelectElement>(null);
    const [fileloadedmessage,setFileLoadedMessage] = useState("");
    const [iseventweekly,setIsEventWeekly] = useState(JSON.parse(IsEventWeekly.toString()));
    const eventtime = convertTime(EventTime);
    const eventimage = useRef<File>();
    const{
        register,
        handleSubmit,
        formState:{isSubmitting}
    } = useForm<IEventForm>({
        defaultValues:{
            eventname:EventName,
            eventdate:EventDate,
            eventtime,
            eventvenue:Venue,
            inquirynumber:InquiryNumber,
            ticketlinks:TicketLinks,
            eventdescription:Description,
            sociallinks:SocialLinks,
        }
    });
    const {ref,...rest} = register("eventvenue",{required:"Event venue is required"});
    const options = {
        fields: ["name"],
        types: ["establishment"]
    };
    useEffect(function(){
        autocompleteref.current = new window.google.maps.places.Autocomplete(inputref.current!,options);
        autocompleteref.current.addListener("place_changed",getPlace);
    },[]);
    async function getPlace(){
        const place = await autocompleteref.current!.getPlace();
        venue.current = `${place.name}`
    }
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
    const submitFormData:SubmitHandler<IEventForm> = async(formeventdata)=>{
        console.log(formeventdata);
        const [hourstring,minute] = formeventdata.eventtime.split(":");
        const [hour,meridian] = formatTime(hourstring);
        const eventtime = `${hour}:${minute} ${meridian}`;
        const formdata = new FormData();
        for(const [key,value] of Object.entries(formeventdata)){
            if(key != "eventtime"){
                if(key != "eventflyer"){
                    formdata.append(key,value);
                }
            }
        }
        if(eventimage.current && formeventdata.eventflyer!.length > 0){
            formdata.append("eventflyer",eventimage.current!);
        }else{
            formdata.append("eventflyer",FlyerImagePath);
        }
        let selecteddayofweek = (selectref.current) ? selectref.current!.value : "";
        formdata.append("Id",Id);
        formdata.append("eventtime",eventtime);
        formdata.append("dayofweek",selecteddayofweek);
        formdata.append("iseventweekly",JSON.stringify(iseventweekly));

        const response = await fetch(`/api/editevent`,{method:"PUT",body:formdata});
        const {message} = await response.json();
        toast.success(message,{
            transition:Slide
        });
    }
    function obtainImageFile(e:React.ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files.length){
            setFileLoadedMessage(e.target.files[0].name);
            eventimage.current = e.target.files[0];
        }
    }
    function checkEventIsWeekly(e:React.ChangeEvent<HTMLInputElement>){
        setIsEventWeekly(e.target.checked);
    }
    return(
        <form className="mt-12 flex flex-col gap-y-5 w-[80%] max-w-[50rem] mx-auto">
            <div>
                <div className="h-fit">
                    <input
                        {...register("eventflyer")}
                        id="image" className="w-0 h-0 peer" 
                        onChange={obtainImageFile}
                        type="file"  accept="image/*"
                    />
                     <label className="
                        cursor-pointer flex border 
                        border-slate-400/60  w-fit px-4 
                        shadow-sm dark:border-blue-200/20
                        py-2 gap-x-3 rounded-[8px] dark:text-slate-200
                        text-slate-500 mb-[6px] peer-focus:ring-2
                        peer-focus:ring-black dark:peer-focus:ring-white"
                        htmlFor="image"
                    >
                        <BsFolderPlus size={25} />
                        <span>Select image</span>
                    </label>
                    {fileloadedmessage != "" && <div className="rounded-[5px] dark:text-white text-slate-600 flex items-center gap-x-2"><IoImageOutline  className="text-slate-500 dark:text-white" size={25}/>{fileloadedmessage}</div>}
                </div>
                
            </div>
            <FormControl 
                register={register}
                validationrules={{required:"Event Name is required"}}
                name="eventname"
                aria-required="true" type="text" label="Event Name"
            />
            <div className="flex items-center gap-x-4">
                <input
                    checked={iseventweekly}
                    ref={checkbox}
                    id="isweekly" 
                    onChange={checkEventIsWeekly}
                    type="checkbox" name="isweekly" 
                    className="h-5 w-5 focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
                <label className="dark:text-slate-200 text-slate-600" htmlFor="isweekly">Does event recur weekly?</label>
            </div>
            {
                iseventweekly && <Select selectedvalue={DayofWeek} ref={selectref}/>
            }
            {
                !iseventweekly && <FormControl 
                    validationrules={{required:"Event Date is required"}}
                    name="eventdate"  register={register}
                    aria-required="true" type="date" label="Event Date" 
                    disabled={iseventweekly}
                 />
            }
            
            <FormControl 
                register={register}
                validationrules={{required:"Event time is required"}}
                name="eventtime"  
                aria-required="true" type="time" label="Event Time"
            />
            <div>
                <label className="text-slate-500 dark:text-slate-200">venue</label>
                <input
                    aria-required="true" 
                    {...rest}
                    ref={(e)=>{
                        ref(e)
                        inputref.current = e;
                    }}
                    className="
                    form-control dark:text-slate-200
                    focus:ring-2 focus:ring-black dark:focus:ring-white
                    dark:bg-transparent text-slate-600" 
                />
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
                <label htmlFor="description" className="text-slate-600 dark:text-slate-200">Description</label>
                <textarea 
                    {...register("eventdescription")}
                    rows={3} id="description" 
                    className="
                        py-2 px-4 block border
                        dark:bg-transparent dark:text-slate-200
                        border-slate-300/80 focus:ring-2 
                        focus:ring-black dark:focus:ring-white rounded-[5px] outline-none w-full
                    "
                />
            </div>
            <FormControl 
                register={register}
                name="sociallinks"
                type="text" label="Social Link"
            />
            <button 
                disabled={isSubmitting}
                className={
                    `flex justify-center items-center
                    bg-black dark:bg-white
                    py-2 rounded-md mb-4 px-5 w-fit
                    dark:text-slate-600 text-white 
                    ${isSubmitting?'opacity-50 cursor-not-allowed':''}`
                } 
                onClick={handleSubmit(submitFormData)}
            >
                {
                    isSubmitting ? 
                    <div className="flex-row-center">
                        <RotatingLines 
                            strokeColor="white" 
                            strokeWidth="4"
                            animationDuration="0.8"
                            width="25"
                            visible={true} 
                        />
                        <span> saving event</span>
                    </div>
                    :"Save Event"
                }
            </button>
        </form>
    )
}
