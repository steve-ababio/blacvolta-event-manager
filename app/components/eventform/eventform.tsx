"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import FormControl from "../../components/formcontrol/formcontrol";
import { RotatingLines } from "react-loader-spinner";
import { useEffect, useRef, useState} from "react";
import Error from "../error/error";
import Select from "../select/select";
import { toast,Slide } from "react-toastify";

export interface IEventForm{
    eventname:string,
    eventdate:string,
    eventtime:string,
    ticketlinks:string
    inquirynumber:string,
    eventdescription:string,
    sociallinks:string
}
const options = {
    componentRestrictions: { country: "gh" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"]
};
export default function EventForm(){
    const file = useRef<File>();
    const autocompleteref = useRef<google.maps.places.Autocomplete>();
    const inputref = useRef<HTMLInputElement>(null);
    const selectref = useRef<HTMLSelectElement>(null);
    const venue = useRef<string>("");
    const formelement = useRef<HTMLFormElement>(null);
    const [fileemptyerror,setFileEmptyError] = useState("");
    const [venueemptyerror,setVenueEmptyError] = useState("");
    const [requirederror,setRequiredError] = useState("");
    const [iseventweekly,setIsEventWeekly] = useState(false);
    const{
        register,
        handleSubmit,
        formState:{isSubmitting,errors},
    } = useForm({
        defaultValues:{
            eventname:"",
            eventdate:"",
            eventtime:"",
            inquirynumber:"",
            ticketlinks:"",
            eventdescription:"",
            sociallinks:""
        }
    });
    useEffect(function(){
        autocompleteref.current = new window.google.maps.places.Autocomplete(inputref.current!,options);
        autocompleteref.current.addListener("place_changed",getPlace);
    },[]);
    async function getPlace(){
        const place = await autocompleteref.current!.getPlace();
        venue.current = `${place.name}`
    }
    const submitFormData:SubmitHandler<IEventForm> = async(data)=>{
        const fileinfo = file.current;
        let selecteddayofweek = ""
        if(!fileinfo){
            setFileEmptyError("Event flyer image is required");
        }else if(inputref.current!.value === ""){
            setVenueEmptyError("Event venue is required");
        }else if(selectref.current){
            selecteddayofweek = selectref.current!.value;
        }       
        else {
            console.log(selecteddayofweek)
            const formdata = new FormData(formelement.current!);
            formdata.append("venue",venue.current);
            formdata.append("flyerimagepath",fileinfo!);
            formdata.append("dayofweek",selecteddayofweek);
            formdata.append("iseventweekly",JSON.stringify(iseventweekly));
            const response = await fetch("/api/event",{method: "POST",body:formdata});
            const {message} = await response.json();
            toast.success(message,{
                transition:Slide
            });
        }
    }
    function obtainImageFile(e:React.ChangeEvent<HTMLInputElement>){
       if(e.target.files && e.target.files.length){
            file.current = e.target.files[0];
       }
    }
    function checkEventIsWeekly(e:React.ChangeEvent<HTMLInputElement>){
        setIsEventWeekly(e.target.checked);
    }
    return(
        <form ref={formelement} onSubmit={handleSubmit(submitFormData)} className="flex flex-col gap-y-5">
            <div>
                <label htmlFor="image" className="block">Event Image: </label>
                <input id="image" className="mb-2" onChange={obtainImageFile} type="file"  aria-required="true" accept="image/*" required />
                {fileemptyerror != "" && <Error message={fileemptyerror!} errortype = "danger" />}
            </div>
            <FormControl 
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
                    className="h-5 w-5" 
                />
                <label htmlFor="isweekly">Does event recur weekly?</label>
            </div>
            {
                iseventweekly && <Select ref={selectref} selectedvalue="0"  />
            }
            {
                !iseventweekly && <FormControl 
                    register={register}
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
                name="eventtime"  
                aria-required="true" type="time" label="Event Time"
                errormessage={errors.eventtime?.message}
            />
            <div>
                <label className="text-slate-500">Venue</label>
                <input 
                    required aria-required="true" 
                    ref={inputref}
                    className="form-control mb-2" 
                />
                {venueemptyerror != "" && <Error message={venueemptyerror!} errortype = "danger" />}
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
                <label htmlFor="description" className="text-slate-500">Description</label>
                <textarea 
                    {...register("eventdescription",)}
                    rows={3} id="description" className="py-2 px-4 block border border-slate-300/80 focus:ring-2 focus:ring-blue-400 rounded-[5px] outline-none w-full"/>
            </div>
            <FormControl 
                register={register}
                name="sociallinks"
                type="text" label="Social Link"
            />
            <button 
                disabled={isSubmitting}
                className={`
                    bg-blue-500 flex justify-center 
                    items-center text-white w-fit px-5 
                    py-2 rounded-md mb-4 
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