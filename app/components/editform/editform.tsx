"use client"
import { useForm,SubmitHandler} from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import FormControl from "../formcontrol/formcontrol";
import { IEventDetails } from "../table/table";
import { IEventForm } from "../eventform/eventform";
import { Slide, toast } from "react-toastify";
import Select from "../select/select";

export default function EditEventForm(props:IEventDetails){
    const {Id,EventName,EventDate,FlyerImagePath,IsEventWeekly,DayofWeek,SocialLinks,EventTime,Venue,TicketLinks,InquiryNumber,Description} = props;
    const file = useRef<File>();
    const formelement = useRef<HTMLFormElement>(null);
    const autocompleteref = useRef<google.maps.places.Autocomplete>();
    const inputref = useRef<HTMLInputElement>(null);
    const dayofweek = useRef("");
    const checkbox = useRef<HTMLInputElement>(null);
    const venue = useRef<string>(Venue);
    const selectref = useRef<HTMLSelectElement>(null);
    const [iseventweekly,setIsEventWeekly] = useState(JSON.parse(IsEventWeekly.toString()));

    const [time,meridian] = EventTime.split(" ");
    const [hourstring,min] = time.split(":");
    let hour = parseInt(hourstring,10);
    let finalhour = "";
    if(meridian === "PM" && hour != 12){
        hour += 12; 
        finalhour = `${hour}`;
    }
    if(meridian === "AM" && hour === 12){
        hour -= 12;
        finalhour = `0${hour}`
    }
    const eventtime = `${finalhour}:${min}`;
    const{
        register,
        handleSubmit,
        formState:{isSubmitting}
    } = useForm({
        defaultValues:{
            eventname:EventName,
            eventdate:EventDate,
            eventtime:eventtime,
            inquirynumber:InquiryNumber,
            ticketlinks:TicketLinks,
            eventdescription:Description,
            sociallinks:SocialLinks
        }
    });
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
        const fileinfo = file.current;
        const [hourstring,minute] = formeventdata.eventtime.split(":");
        const [hour,meridian] = formatTime(hourstring);
        const eventtime = `${hour}:${minute} ${meridian}`;
        
        const formdata = new FormData(formelement.current!);
        formdata.delete("eventtime");
        formdata.append("eventtime",eventtime);
        formdata.append("venue",venue.current);
        if(fileinfo){
            formdata.append("flyerimage",fileinfo!);
        }else{
            formdata.append("flyerimagepath",FlyerImagePath);
        }
        let selecteddayofweek = (selectref.current) ? selectref.current!.value : "";
        formdata.append("Id",Id);
        console.log(dayofweek.current);
        formdata.append("dayofweek",selecteddayofweek);
        formdata.append("iseventweekly",JSON.stringify(iseventweekly));
        const response = await fetch(`/api/edit`,{method:"PUT",body:formdata});
        const {message} = await response.json();
        toast.success(message,{
            transition:Slide
        });
        
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
            <div className="flex items-center gap-x-4">
                <input
                    checked={iseventweekly}
                    ref={checkbox}
                    id="isweekly" 
                    onChange={checkEventIsWeekly}
                    type="checkbox" name="isweekly" 
                    className="h-5 w-5"
                />
                <label htmlFor="isweekly">Does event recur weekly?</label>
            </div>
            {
                iseventweekly && <Select selectedvalue={DayofWeek} ref={selectref}/>
            }
            {
                !iseventweekly && <FormControl 
                    register={register}
                    validationrules={{required:"Event Date is required"}}
                    name="eventdate"
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
                type="tel" label="Inquiry Number:"
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
                disabled={isSubmitting}
                className={
                    `flex justify-center items-center
                     bg-blue-500 text-white w-fit px-5
                      py-2 rounded-md mb-4 ${isSubmitting?'opacity-50 cursor-not-allowed':''}`
                } 
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
