"use client"
import { useState,useEffect,FC } from "react";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from 'yup';
import clsx from 'clsx';
import { useAppDispatch } from "@/store";
import { setReloading } from "@/store/slices/reload.slice";
import { imageCreate } from "@/django_api/create_comment";
import { IoSend } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
type Props = {
    board_id:number;
};

const ImageCreate:FC<Props> = ({board_id})=>{
	const router= useRouter()
	const dispatch = useAppDispatch()
    const [ isOpen, setIsOpen ] = useState(false);
	const account = useAppSelector((state:RootState)=>state.loginUserSlice.account)
	const token = useAppSelector((state:RootState)=>state.loginUserSlice.token)
	const [imageFieldKey, setImageFieldKey] = useState(Date.now());

	const formSchema = yup.object().shape({
		image: yup
			.mixed()
			.test('fileType', 'Only image files are allowed', (value) => {
				if (!value) return true; 
				const supportedTypes = ['image/jpg','image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']; 
				return !!(value && (value as File).type && supportedTypes.includes((value as File).type));
			})
		});

	type FormType = {
		image: File | null
	};
	
	const FORM_DATA: FormType = {
		image: null
	};

	const [ toast, setToast ] = useState({
        message: "",
        type: "",
    });

    const formik = useFormik<FormType>({
        initialValues: FORM_DATA,
        validationSchema: formSchema,
        onSubmit: async (formData:FormType) => {
            if(formData.image===null){
                setToast({ message: "Image is necessary", type: 'error' });
                return
            }
            try {
                if (account && token) {
                    dispatch(setReloading(true))
                    const data = await imageCreate(board_id, formData, token);
                    setIsOpen(false);
                    if (data.error) {
                        setToast({ message: "Failed to create Image", type: 'error' });
                    } else {
                        setToast({ message: "Succeeded to create Image", type: 'success' });
                    }
                } else {
                    router.push('/login');
                }
            } catch (error) {
                // error
                console.error('Post error:', error);
                setToast({ message: "Failed to create image", type: "error" });
            } finally {
				dispatch(setReloading(false))
			}
            },
        });
	
	useEffect(()=>{
		setIsOpen(false)
	}, [])

	const openModal = () => {
		if(!account||!token){
			return router.push('/login')
		}
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};


    return(
        <>
            {toast.message && (
						<div className={
							clsx(`fixed z-[100] top-5 right-5 w-fit text-white text-lg px-5 py-3 rounded-md mb-5 `,
							{
							"bg-red-500": toast.type === "error",
							"bg-green-500": toast.type === "success",
							}
						)}>{toast.message}
						</div>)}
            {/* Open modal button */}
			<div className='flex justify-center fixed bottom-24'>
				<button className="z-50 bg-gray-300 hover:bg-gray-400 text-xs text-black p-2 m-1 rounded  " type="button" onClick={openModal}>
					<FaImage size={15}/>
				</button>
			</div>

			{/* Modal */}
			{isOpen && (
				<div className="z-50 h-screen w-screen flex items-center justify-center bg-blue-100 bg-opacity-50 transform scale-100 transition-transform duration-300 ">
					{/* Modal content */}
						<div className="w-full fixed bottom-10 bg-white p-2 m-4 rounded">
							<div className="flex justify-between">
								{/* Close modal button */}
								<button className="focus:outline-none" type="button" onClick={closeModal}>
									{/* Hero icon - close button */}
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<form className="w-full flex justify-between items-center" onSubmit={formik.handleSubmit} encType="multipart/form-data">
								<div className="flex flex-col justify-between">
									{/* image */}
									<div className="form-control">
										<input
											key={imageFieldKey}
											id="image"
											type="file"
											name="image"
											className={clsx(
												"input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
												{
													"border-2 border-red-500 bg-red-100 text-red-800":
													formik.touched.image && formik.errors.image,
												}
												)}
                                                onChange={(event) => {
                                                    const file = event.target.files && event.target.files[0];
                                                    if (file) {
                                                        formik.setFieldValue("image", file);
                                                    }
                                                }}
                                            required
										/>
									</div>
									{formik.errors.image && formik.touched.image && (
											<p className="text-red-500 ml-1 my-3">
												{formik.errors.image}
											</p>
										)}
								</div>

								<div className="form-control mt-6">
									<button type="submit" className="">
                                    <IoSend size={30}/>
                                    </button>
								</div>
							</form>
						</div>
					
				</div>
			)}
        </>
    )
}

export default ImageCreate