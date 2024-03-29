import { BACKEND_ENDPOINT } from "@/config/envs";

export const commentCreate = async (board_id:number,formData:{content:string},token: string) => {
    try{
        const response = await fetch(`${BACKEND_ENDPOINT}/board/comment/create/${board_id}`, {
            method: 'POST',
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"  
            },
            body: JSON.stringify(formData)
        });

        return response.json();
    }catch (error) {
		console.error(
			"There has been a problem with your fetch operation: ",
			error
		);
		throw error;
	}
}
