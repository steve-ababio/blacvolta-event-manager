import { FILE_UPLOAD_URL } from "../constants/constants";

export async function uploadImage(image:File){
    const imageformdata = new FormData();
    imageformdata.append("image",image)
    try{
        const imageresponse = await fetch(FILE_UPLOAD_URL,{method:"POST",body:imageformdata});
        const {file_name} = await imageresponse.json();
        return file_name as string;
    }catch(error){
        
        throw new Error("Failed to upload image");
    }
}