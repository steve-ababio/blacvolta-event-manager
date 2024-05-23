import { prisma } from "@/app/lib/prisma";
import { uploadImage } from "@/app/utils/util";
import { NextRequest, NextResponse } from "next/server";

type ParagraphType = {
    blogID:number,
    title:string
    imagepath:string,
    body:string
}

function createParagraph(paragraph:ParagraphType){
    return prisma.paragraph.create({
        data:paragraph
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
    const blogtitle = data.get("blogtitle") as string;
    const author = data.get("authorname") as string;
    const date = data.get("datewritten") as string;
    const blogimage = data.get("blogimage") as File;
    const paragraph = JSON.parse(data.get("paragraph") as string);
    const paragraphimage = data.get("paragraphimage") as File;

    let blogimagepath =  await uploadImage(blogimage);
    let {id} = await createBlogpost(author,date,blogtitle,blogimagepath);
   
    let paragraphimagepath = "";    
    if(paragraph.image instanceof File){
        paragraphimagepath = await uploadImage(paragraphimage);
    }
    const fullparagraph:ParagraphType = {
        title:paragraph.title,
        body:paragraph.body,
        imagepath:paragraphimagepath,
        blogID:id
    };
    try{
        await createParagraph(fullparagraph);
    }catch(error){
        return NextResponse.json({message:"Error creating blog post: "+error});
    }
    console.log("sending results");
    return NextResponse.json({message:"Blog post created successfully"});
}