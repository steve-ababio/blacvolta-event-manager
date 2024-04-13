"use client"
import { useForm,SubmitHandler} from "react-hook-form";
import { useEffect, useRef } from "react";
import { RotatingLines } from "react-loader-spinner";
import FormControl from "../formcontrol/formcontrol";
import { IEventDetails } from "../table/table";
import { IEventForm } from "../eventform/eventform";

export default function EditEventForm(props:IEventDetails){
    const {Id,EventName,EventDate,FlyerImagePath,SocialLinks,EventTime,Venue,TicketLinks,InquiryNumber,Description} = props;
    const file = useRef<File>();
    const formelement = useRef<HTMLFormElement>(null);
    const autocompleteref = useRef<google.maps.places.Autocomplete>();
    const inputref = useRef<HTMLInputElement>(null);
    const venue = useRef<string>(Venue);
    
    const{
        register,
        handleSubmit,
        formState:{errors,isSubmitting,isLoading}
    } = useForm({
        defaultValues:{
            eventname:EventName,
            eventdate:EventDate,
            eventtime:EventTime,
            inquirynumber:InquiryNumber,
            ticketlinks:TicketLinks,
            eventdescription:Description,
            sociallinks:SocialLinks
        }
    });
    const options = {
        componentRestrictions: { country: "gh" },
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
    const submitFormData:SubmitHandler<IEventForm> = async(data)=>{

        const fileinfo = file.current;
        const formdata = new FormData(formelement.current!);
        formdata.append("venue",venue.current);
        if(fileinfo){
            formdata.append("flyerimagepath",fileinfo!);
        }else{
            formdata.append("flyerimagepath",FlyerImagePath);
        }
        formdata.append("Id",Id);
        const response = await fetch(`/api/edit`,{method:"PUT",body:formdata});
        const message = await response.json();
        console.log(message);
        
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
            <div>
                <label className="text-slate-500">venue</label>
                <input defaultValue={Venue}  aria-required="true" ref={inputref} className="form-control" />
            </div>

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
                    {...register("eventdescription")}
                    rows={3} id="description" className="py-2 px-4 block border border-slate-300/80 focus:ring-2 focus:ring-blue-400 rounded-[5px] outline-none w-full"/>
            </div>
            <FormControl 
                register={register}
                name="sociallinks"
                type="text" label="Social Link"
            />
            <button 
                className="flex justify-center items-center bg-blue-500 text-white w-fit px-5 py-2 rounded-md mb-4" 
                onClick={handleSubmit(submitFormData)}
            >
                {isSubmitting ? 
                    <>
                        <RotatingLines 
                            strokeColor="white" 
                            strokeWidth="4"
                            animationDuration="0.8"
                            width="25"
                            visible={true} />
                            <span>  saving event</span>
                    </>
                    :"Save Event"
                }
            </button>
        </form>
    )
}