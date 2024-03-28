"use client"
import { useState,useEffect } from "react";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from 'yup';
import clsx from 'clsx';
import { boardCreate } from "@/django_api/create_board";
import { useAppDispatch } from "@/store";
import { setReloading } from "@/store/slices/reload.slice";

const CreateBoard = ()=>{
	const router= useRouter()
	const dispatch = useAppDispatch()
    const [ isOpen, setIsOpen ] = useState(false);
	const account = useAppSelector((state:RootState)=>state.loginUserSlice.account)
	const token = useAppSelector((state:RootState)=>state.loginUserSlice.token)

	const formSchema = yup.object().shape({
		title: yup
			.string()
			.max(100, "Title must be at most 100 characters long")
			.required("name is required!"),
		});

	type FormType = {
		title: string;
	};
	
	const FORM_DATA: FormType = {
		title: "",
	};

	const [ toast, setToast ] = useState({
        message: "",
        type: "",
    });

    const formik = useFormik<FormType>({
        initialValues: FORM_DATA,
        validationSchema: formSchema,
        onSubmit: async (formData:FormType) => {
            try {
				dispatch(setReloading(true))
				// Exclude empty url and price
				if(account&&token){
					const data = await boardCreate(formData,token)
                    console.log(data)
					setIsOpen(false)
					if (data.error) {
						setToast({  message: "Failed to create board", type: 'error' });
					} else {
						setToast({  message: "Succeeded to create board", type: 'success' });
					}
				}else{
					router.push('/login')
				}
				
            } catch (error) {
                // error
                console.error('Post error:', error);
                setToast({ message: "Failed to create snack", type: "error" });
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
            {/* Open modal button */}
			<div className='flex justify-center'>
				<button className="bg-slate-600 p-2 rounded text-white btn btn-ghost text-base w-30 h-10" type="button" onClick={openModal}>
					<p>Create New Board</p>
				</button>
			</div>

			{/* Modal */}
			{isOpen && (
				<div className="z-50 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-blue-100 bg-opacity-50 transform scale-100 transition-transform duration-300 border-radius">
					<div className="bg-white p-12 w-full overflow-y-auto">
						
						{/* Modal content */}
						{toast.message && (
						<div className={
							clsx(`fixed z-[100] top-5 right-5 w-fit text-white text-lg px-5 py-3 rounded-md mb-5 `,
							{
							"bg-red-500": toast.type === "error",
							"bg-green-500": toast.type === "success",
							}
						)}>{toast.message}
						</div>)}
						<div className="w-full  ">
							<div className="flex justify-between">
								<h2 className='text-xl '>Create New Board</h2>

								{/* Close modal button */}
								<button className="focus:outline-none" type="button" onClick={closeModal}>
									{/* Hero icon - close button */}
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="card shrink-0 w-full shadow-2xl bg-base-100 overflow-y-auto ">
								<form className="card-body  w-full " onSubmit={formik.handleSubmit} encType="multipart/form-data">
									{/* title */}
									<div className="form-control">
										<label className="label">
											<span className="label-text">Title</span>
										</label>
										<input 
											id="title"
											name="title"
											type="text" 
											value={formik.values.title} 
											onChange={formik.handleChange} 
											onBlur={formik.handleBlur}
											placeholder="Title"
											className={clsx(
												"input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
												{
													"border-2 border-red-500 bg-red-100 text-red-800":
													formik.touched.title && formik.errors.title,
												}
												)}
												required
										/>
										{formik.errors.title && formik.touched.title && (
											<p className="text-red-500 ml-1 my-3">
												{formik.errors.title}
											</p>
										)}
									
									</div>

									<div className="form-control mt-6">
										<button type="submit" className="btn btn-ghost">Create</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
        </>
    )
}

export default CreateBoard