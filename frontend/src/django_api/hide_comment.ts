import { BACKEND_ENDPOINT } from "@/config/envs";

export const commentHide= async (comment_id:number,token:string)=>{
    const response = await fetch(`${BACKEND_ENDPOINT}/board/comment/hide/${comment_id}`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({})
    });
    return response;
}