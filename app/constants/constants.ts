export const FILE_UPLOAD_URL = "https://files.blacvolta.com/upload.php";
export interface IEventDetails {
    Id:string,
    adminUserId:string|null,
    userId:string|null,
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
    approved:boolean
    paid:boolean
}