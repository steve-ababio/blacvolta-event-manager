import { FILE_UPLOAD_URL } from "../constants/constants";

export async function uploadImage(image:File){
    const imageformdata = new FormData();
    imageformdata.append("image",image)
    const imageresponse = await fetch(FILE_UPLOAD_URL,{method:"POST",body:imageformdata});
    const {file_name} = await imageresponse.json();
    return file_name as string;
}

export function formatTime(hourstring:string,other:string){
    const [minutestring,meridian] = other.split(" ");
    let hour = parseInt(hourstring,10);
    let minute = parseInt(minutestring,10);
    if(hour != 12 && meridian === "PM"){
        hour += 12;
    }
    if(hour === 12 && meridian === "AM"){
        hour = 0;
    }
    return [hour,minute,0];
}