import { prisma } from "@/app/lib/prisma";
import { uploadImage } from "@/app/utils/util";
import { NextRequest, NextResponse } from "next/server";

type ParagraphType = {
    blogID:number,
    body:string,
    id?:string,
    position:number,
    instagrampostlink:string,
    imagepath:string
}

async function updateParagraphs(paragraphs:ParagraphType[]){
    for(let paragraph of paragraphs){
        if(paragraph.id === ""){
            delete paragraph.id;
            const result = await prisma.paragraph.create({
                data:paragraph,
                select:{
                    id:true
                }
            });
            paragraph.id = result.id;
        }else{
            await prisma.paragraph.update({
                where:{
                    id:paragraph.id
                },
                data:paragraph,
                select:{
                    id:true
                }
            });
        }
    }
    return paragraphs;
}

async function deleteParagraphs(paragraphs:ParagraphType[]){
    for(let paragraph of paragraphs){
        await prisma.paragraph.delete({
            where:{
                id:paragraph.id
            }
        })
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
    const deletedparagraphsdata = data.get("deletedparagraphs") as string;
    const deletedparagraphs = JSON.parse(deletedparagraphsdata);

    let blogimagepath = "";
    if(blogimage instanceof File){
        blogimagepath = await uploadImage(blogimage);
    }else{
        blogimagepath = blogimage;
    }   
    await updateBlogpost(parseInt(Id,10),author,date,blogtitle,blogimagepath);
    
    let paragraphstrings = data.getAll("paragraph");
    const paragraphs:ParagraphType[] = [];
    for(let i = 0;i < paragraphstrings.length;i++) {
        const paragraphimage = data.get(`paragraphs[${i}]-image`) as File|null;
        const paragraph = JSON.parse(paragraphstrings[i] as string);
        const instagrampostlink = paragraph.instagrampostlink;
        if(instagrampostlink.includes("/?utm_source=ig_web_copy_link")){
            let startindex = instagrampostlink.indexOf("/?utm_source=ig_web_copy_link");
            paragraph.instagrampostlink = `${instagrampostlink.substring(0,startindex)}/embed/`;
        }else if(instagrampostlink.includes("/?igsh=")){
            let startindex = instagrampostlink.indexOf("/?igsh=");
            paragraph.instagrampostlink = `${instagrampostlink.substring(0,startindex)}/embed/`;
        }
        //upload paragraph image 
        if(paragraphimage instanceof File) {
            paragraph.imagepath = await uploadImage(paragraphimage);
        }
        paragraphs.push({
            blogID:paragraph.blogID,
            id:paragraph.id,
            body:paragraph.body,
            position:parseInt(paragraph.position,10),
            instagrampostlink:paragraph.instagrampostlink,
            imagepath:paragraph.imagepath
        });
    }
    let updatedparagraphs;
    try{
        updatedparagraphs = await updateParagraphs(paragraphs);
        await deleteParagraphs(deletedparagraphs)
        
    }catch(error){
        return NextResponse.json({message:"Error creating blog post: "+error});
    }
    return NextResponse.json({message:"Blog post editted successfully",updatedparagraphs});
}