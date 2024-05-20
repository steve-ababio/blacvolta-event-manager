import { prisma } from "@/app/lib/prisma";
import { uploadImage } from "@/app/utils/util";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

type ParagraphType = {
    blogID:number,
    title:string
    imagepath:string,
    body:string,
    id?:string
}


async function updateParagraphs(paragraphs:ParagraphType[]){
    for(let paragraph of paragraphs){
        if(paragraph.id === ""){
            delete paragraph.id;
            await prisma.paragraph.create({
                data:paragraph
            });
        }else{
            await prisma.paragraph.update({
                where:{
                    id:paragraph.id
                },
                data:paragraph
            });
        }
    }
}
async function updateBlogpost(id:number,author:string,date:string,title:string,imagepath:string){
    return await prisma.blogPost.update({
        where:{
            id
        },
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

export async function PUT(req:NextRequest){
    const data = await req.formData();
    const paragraphs:ParagraphType[] = []
    const blogtitle = data.get("blogtitle") as string;
    const author = data.get("authorname") as string;
    const date = data.get("datewritten") as string;
    const Id = data.get("id") as string;
    const blogimage = data.get("blogimage") as File|string;

    let blogimagepath = "";
    if(blogimage instanceof File){
        blogimagepath =  await uploadImage(blogimage);
    }else{
        blogimagepath = blogimage;
    }   
    let {id} = await updateBlogpost(parseInt(Id,10),author,date,blogtitle,blogimagepath);

    let paragraphstring = data.getAll("paragraph");
    for(let i = 0;i < paragraphstring.length;i++) {
        const paragraph = JSON.parse(paragraphstring[i] as string);
        paragraph.image = data.get(`image-${i}`) as File|string;

        let paragraphimagepath = paragraph.image;
        if(paragraph.image instanceof File){
            paragraphimagepath = await uploadImage(paragraph.image);
        }
        paragraphs.push({
            blogID:id,
            id:paragraph.id,
            body:paragraph.body,
            title:paragraph.title,
            imagepath:paragraphimagepath
        });
    }
    try{
        await updateParagraphs(paragraphs);
    }catch(error){
        return NextResponse.json({message:"Error creating blog post: "+error});
    }
    return NextResponse.json({message:"Blog post editted successfully"});
}