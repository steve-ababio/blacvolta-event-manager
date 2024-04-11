"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import FormControl from "../../components/formcontrol/formcontrol";
import Googlemap from "../../components/googlemap/googlemap";
import { useRef } from "react";

export interface EventForm{
    eventname:string,
    eventdate:string,
    eventtime:string,
    venue:string,
    ticketlinks:string
    inquirynumber:string,
    eventdescription:string,
    sociallinks:string
}

export default function EventForm(){
    const file = useRef<File>()
    const{
        register,
        handleSubmit,
        formState:{errors,isSubmitting}
    } = useForm({
        defaultValues:{
            eventname:"",
            eventdate:"",
            eventtime:"",
            venue:"",
            inquirynumber:"",
            ticketlinks:"",
            eventdescription:"",
            sociallinks:""
        }
    });
    const submitFormData:SubmitHandler<EventForm> = (data)=>{
        const fileinfo = file.current;
        console.log("data: ",data)
    }
    function obtainImageFile(e:React.ChangeEvent<HTMLInputElement>){
       if(e.target.files && e.target.files.length){
            file.current = e.target.files[0];
       }
    }
    return(
        <form onSubmit={handleSubmit(submitFormData)} className="flex flex-col gap-y-5">
            <div>
                <label className="block">Event Image: </label>
                <input onChange={obtainImageFile} type="file" aria-required="true" accept="image/*" required />
            </div>
            <FormControl 
                register={register}
                validationrules={{required:"Event Name is required"}}
                name="eventname"
                aria-required="true" type="text" label="Event Name"
            />
            <FormControl 
                register={register}
                validationrules={{required:"Event Date is required"}}
                name="eventdate"
                aria-required="true" type="date" label="Event Date" 
            />
            <FormControl 
                register={register}
                validationrules={{required:"Event time is required"}}
                name="eventtime"  
                aria-required="true" type="time" label="Event Time"
            />
            <FormControl 
                register={register}
                validationrules={{required:"Event venue is required"}}
                name="venue"
                aria-required="true" type="text" label="Venue:" 
            />
            <Googlemap />
            <FormControl 
                register={register}
                name="ticketlinks"
                type="text" label="Ticket Links:" 
            />
            <FormControl 
                register={register}
                name="inquirynumber"
                type="text" label="Inquiry Number:"
            />
            <div>
                <label htmlFor="description">Description</label>
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
                className="bg-blue-500 text-white w-fit px-5 py-2 rounded-md mb-4" 
                onClick={handleSubmit(submitFormData)}>Add Event</button>
    </form>
    )
}