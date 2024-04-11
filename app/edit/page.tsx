"use client"
import { useForm,SubmitHandler} from "react-hook-form";
import FormControl from "../components/formcontrol/formcontrol";
import Googlemap from "../components/googlemap/googlemap";
import { IEventDetails } from "../components/table/table";
import { EventForm } from "../components/eventform/eventform";
import { useRef } from "react";
import { UPLOAD_BASE_URL } from "../constants/constants";

export default function EditEvent({searchParams}:{searchParams:IEventDetails}){
    const file = useRef<File>()
    const formelement = useRef<HTMLFormElement>(null)
    const {EventName,EventDate,FlyerImagePath,SocialLinks,EventTime,Venue,TicketLinks,InquiryNumber,Description} = searchParams;
    const{
        register,
        handleSubmit,
        formState:{errors,isSubmitting}
    } = useForm({
        defaultValues:{
            eventname:EventName,
            eventdate:EventDate,
            eventtime:EventTime,
            venue:Venue,
            inquirynumber:InquiryNumber,
            ticketlinks:TicketLinks,
            eventdescription:Description,
            sociallinks:SocialLinks
        }
    });
    const submitFormData:SubmitHandler<EventForm> = async(data)=>{
        const formdata = new FormData(formelement.current!);
        const response = await fetch(`${UPLOAD_BASE_URL}?`,{method:"PUT",body:formdata});
        const message = await response.json();
    }
    function obtainImageFile(e:React.ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files.length){
             file.current = e.target.files[0];
        }
     }
    return(
        <form ref={formelement} className="flex flex-col gap-y-5 w-[80%] max-w-[50rem] mx-auto">
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
                    // {...register("eventdescription",)}
                    rows={3} id="description" className="py-2 px-4 block border border-slate-300/80 focus:ring-2 focus:ring-blue-400 rounded-[5px] outline-none w-full"/>
            </div>
            <FormControl 
                register={register}
                name="sociallinks"
                type="text" label="Social Link"
            />
            <button 
                className="bg-blue-500 text-white w-fit px-5 py-2 rounded-md mb-4" 
                onClick={handleSubmit(submitFormData)}
            >
                Save Event
            </button>
        </form>
    )
}