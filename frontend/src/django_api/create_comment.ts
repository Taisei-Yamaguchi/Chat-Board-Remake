import { BACKEND_ENDPOINT } from "@/config/envs";

export const commentCreate = async (board_id:number,formData:{content:string,reply_to_comment:number|null},token: string) => {
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

export const imageCreate = async (board_id:number,inputData:{image:File|null},token: string) => {
    const formData = new FormData();
    if(inputData.image){
        try {
            const compressedImage = await compressImage(inputData.image);
            formData.append('image', compressedImage);
        } catch (error) {
            console.error("Failed to compress image: ", error);
            throw error;
        }
    }else{
        return
    }
    try{
        const response = await fetch(`${BACKEND_ENDPOINT}/board/comment-image/create/${board_id}`, {
            method: 'POST',
            headers: {
                "Authorization": `Token ${token}`, 
            },
            body: formData
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


const compressImage = async (imageFile: File): Promise<Blob> => {
    const maxWidth = 1920; // max width
    const maxHeight = 1080; // max height
    const maxFileSize = 1 * 1024 * 1024; // max file size（1MB）

    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Failed to get 2d rendering context'));
            return;
        }

        const img = new Image();
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            // resize
            if (width > maxWidth || height > maxHeight) {
                if (width > height) {
                    height *= maxWidth / width;
                    width = maxWidth;
                } else {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            let quality = 0.9;
            let compressedImage = canvas.toDataURL('image/jpeg', quality);

            while (compressedImage.length > maxFileSize && quality > 0.1) {
                quality -= 0.1;
                compressedImage = canvas.toDataURL('image/jpeg', quality);
            }

            resolve(dataURItoBlob(compressedImage));
        };

        img.onerror = (event) => {
            reject(new Error(`Failed to load image: ${event}`));
        };

        img.src = URL.createObjectURL(imageFile);
    });
};

// Data URI to Blob
const dataURItoBlob = (dataURI: string): Blob => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
};
