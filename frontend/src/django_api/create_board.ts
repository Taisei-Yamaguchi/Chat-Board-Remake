import { BACKEND_ENDPOINT } from "@/config/envs";

export const boardCreate = async (formData:{title:string},token: string) => {
    try{
        const response = await fetch(`${BACKEND_ENDPOINT}/board/create/`, {
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
