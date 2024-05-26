import { ParagraphType } from "@/app/constants/constants";
import { prisma } from "@/app/lib/prisma";
import { uploadImage } from "@/app/utils/util";
import { NextRequest, NextResponse } from "next/server";

async function updateParagraph(paragraph:ParagraphType){
    try{
        await prisma.paragraph.update({
            where:{
                id:paragraph.id
            },
            data:paragraph
        });
    }catch(error){
        return NextResponse.json({message:`Error updating paragraph: ${error}}`})
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
    const blogtitle = data.get("blogtitle") as string;
    const author = data.get("authorname") as string;
    const date = data.get("datewritten") as string;
    const Id = data.get("id") as string;
    const blogimage = data.get("blogimage") as File|string;
    const paragraph = JSON.parse(data.get("paragraph") as string);
    const paragraphimage = data.get("paragraphimage") as File|string;

    let blogimagepath = "";
    if(blogimage instanceof File){
        blogimagepath = await uploadImage(blogimage);
    }else{
        blogimagepath = blogimage;
    }   
    await updateBlogpost(parseInt(Id,10),author,date,blogtitle,blogimagepath);
    let paragraphimagepath = "";
    if(paragraphimage instanceof File){
        paragraphimagepath = await uploadImage(paragraphimage);
    }else{
        paragraphimagepath = paragraphimage;
    }
    const fullparagraph:ParagraphType = {
        id:paragraph.id,
        blogID: paragraph.blogID,
        body: paragraph.body,
        imagepath: paragraphimagepath,
        title: paragraph.title,
    }
    try{
        await updateParagraph(fullparagraph);
    }catch(error){
        return NextResponse.json({message:"Error creating blog post: "+error});
    }
    return NextResponse.json({message:"Blog post editted successfully"});
}