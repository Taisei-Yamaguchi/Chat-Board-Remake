import { BACKEND_ENDPOINT } from "@/config/envs";

export const boardHide= async (board_id:number,token:string)=>{
    const response = await fetch(`${BACKEND_ENDPOINT}/board/hide/${board_id}`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({})
    });
    return response;
}