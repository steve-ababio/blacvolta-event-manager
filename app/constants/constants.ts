import { Paragraph } from "../blog/components/blogform/blogform";

export const FILE_UPLOAD_URL = "https://files.blacvolta.com/upload.php";

export interface IUser{
    Organizationname:string,
    Email:string,
    Phonenumber?:string, 
    EventId:string
}
export interface IEvent{
    Id:string,
    Venue:string,
    EventDate:string,
    EventName:string,
    EventTime:string,
    SocialLinks:string,
    TicketLinks:string,
    Description:string,
    FlyerImagePath:string,
    InquiryNumber:string,
    IsEventWeekly:boolean,
    DayofWeek:string,
    approved:boolean,
    paid:boolean,
    hidden:boolean,
}
export type IUserEventDetails = IEvent & IUser;
export interface ParagraphResult {
    id: string;
    body: string; 
    position: number;
    instagrampostlink: string; 
    imagepath: string; 
    blogID: number;
}
export interface IEditorial {
    id:number,
    author:string,
    title:string,
    date:string,
    imagepath:string,
    approved:boolean,
    paragraph:ParagraphResult[]
}

export type Tab_T = "EVENTS"|"EDITORIALS"