export type Comment ={
    id: number,
    board:{
        id:number,
        title:string,
    },
    account: {
        id:number,
        username:string,
    },
    content:string|null,
    image_url:string|null,
    reply_to_comment:number,
    created_at:string,
}