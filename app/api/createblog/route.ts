import { prisma } from "@/app/lib/prisma";
import { uploadImage } from "@/app/utils/util";
import { NextRequest, NextResponse } from "next/server";

type ParagraphType = {
    blogID:number,
    title:string
    imagepath:string,
    body:string
}

function createParagraphs(paragraphs:ParagraphType[]){
    return prisma.paragraph.createMany({
        data:paragraphs
    });
}
async function createBlogpost(author:string,date:string,title:string,imagepath:string){
    return await prisma.blogPost.create({
        data:{
            author,
            date,
            title,
            imagepath
        },
        select:{
            id:true
        }
    });
}

export async function POST(req:NextRequest){
    const data = await req.formData();
    const paragraphs:ParagraphType[] = []
    const blogtitle = data.get("blogtitle") as string;
    const author = data.get("authorname") as string;
    const date = data.get("datewritten") as string;
    const blogimage = data.get("blogimage") as File;

    console.log("request data: ",data);
    let blogimagepath =  await uploadImage(blogimage);

    let {id} = await createBlogpost(author,date,blogtitle,blogimagepath);

    let paragraphstring = data.getAll("paragraph");
    for(let i = 0;i < paragraphstring.length;i++) {
        const paragraph = JSON.parse(paragraphstring[i] as string);
        paragraph.image = data.get(`image-${i}`) as File|null;
        let paragraphimagepath = "";
        
        if(paragraph.image instanceof File){
            paragraphimagepath = await uploadImage(paragraph.image);
        }
        paragraphs.push({
            blogID:id,
            body:paragraph.body,
            title:paragraph.title,
            imagepath:paragraphimagepath
        });
    }
    try{
        await createParagraphs(paragraphs);
    }catch(error){
        return NextResponse.json({message:"Error creating blog post: "+error});
    }
    console.log("sending results");
    return NextResponse.json({message:"Blog post created successfully"});
}