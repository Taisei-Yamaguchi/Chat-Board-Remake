"use client"
import { useState,useEffect ,FC} from "react";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from 'yup';
import clsx from 'clsx';
import { commentCreate } from "@/django_api/create_comment";
import { useAppDispatch } from "@/store";
import { setReloading } from "@/store/slices/reload.slice";
import { setCommentReply } from "@/store/slices/commentReply.slice";
import { IoSend } from "react-icons/io5";

type Props = {
    board_id:number;
};

const CreateBoardComment: FC<Props> = ({board_id})=>{
	const router= useRouter()
	const dispatch = useAppDispatch()
	const account = useAppSelector((state:RootState)=>state.loginUserSlice.account)
	const token = useAppSelector((state:RootState)=>state.loginUserSlice.token)
    const commentReply = useAppSelector((state:RootState)=>state.commentReplySlice.commentReply)

    const handleClearReply=()=>{
        dispatch(setCommentReply(null))
    }

	const formSchema = yup.object().shape({
	    content: yup
			.string()
			.max(1000, "Content must be at most 1000 characters long")
			.required("content is required!"),
		});

	type FormType = {
		content: string;
	};
	
	const FORM_DATA: FormType = {
		content: "",
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
                    const updatedFormData = { ...formData, reply_to_comment: commentReply };
					const data = await commentCreate(board_id,updatedFormData,token)
                    
					if (data.error) {
						setToast({  message: "Failed to create board", type: 'error' });
					} else {
						setToast({  message: "Succeeded to create board", type: 'success' });
                        formik.setValues({ content: "" });
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
	


    return(
        <div className=" fixed bottom-0 left-0 ">
        {toast.message && (
			<div className={
				clsx(`fixed z-50 top-5 right-5 w-fit text-white text-lg px-5 py-3 rounded-md mb-5 `,
				{
                    "bg-red-500": toast.type === "error", 
				}
				)}>{toast.message}
			</div>)}
        
            <form className="fixed bottom-0 left-0 flex-col m-2 w-4/5 h-28 " onSubmit={formik.handleSubmit} >
                {commentReply&&(
                    <div className="text-sm flex ">
                    <div className="mx-4">{`＞＞${commentReply}`}</div>
                    <button className="mx-4 btn btn-xs btn-ghost" onClick={()=>handleClearReply()}>clear</button>
                </div>
                )}
                {/* content */}
                <div className="flex">
                    <textarea
                        id="content"
                        name="content"
                        value={formik.values.content} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        placeholder="Comment"
                        className=
                            "block w-4/5 rounded-md border-0 m-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        required
                    ></textarea>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-ghost">
                            <IoSend size={30}/>
                        </button>
                    </div>
                </div>
                {!account&&(
                    <div className="text-xs">* you need to login to comment.</div>
                )}
            </form>
        </div>
    )
}

export default CreateBoardComment