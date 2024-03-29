import { BACKEND_ENDPOINT } from "@/config/envs";

export const board_search = async (keyword:string) => {
    const response = await fetch(`${BACKEND_ENDPOINT}/board/search/?keyword=${keyword}`, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
    });
    const data = await response.json();
    return data;
}


export const get_board_detail = async (board_id:number) => {
    const response = await fetch(`${BACKEND_ENDPOINT}/board/get/${board_id}`, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
    });
    const data = await response.json();
    return data;
}
