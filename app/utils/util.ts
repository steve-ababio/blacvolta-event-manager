import { put } from "@vercel/blob";

export async function uploadImage(image:File){
    const buffer = Buffer.from(await image.arrayBuffer())
    const filename = image.name.replaceAll(" ","_");
    const blob = await put(filename,buffer, {
        access: 'public',
    });
    return blob.url;
}