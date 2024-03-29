"use client"
import { TbTrashXFilled } from "react-icons/tb"
import { FC, useEffect } from "react";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";
import { commentHide } from "@/django_api/hide_comment";
import { useRouter } from "next/navigation";
import { setReloading } from "@/store/slices/reload.slice";
import { useAppDispatch } from "@/store";

type Props = {
    comment_id: number;
};
const CommentDelete : FC<Props>= ({comment_id})=>{
    const router = useRouter()
    const dispatch = useAppDispatch()
    const account = useAppSelector((state:RootState)=>state.loginUserSlice.account)
	const token = useAppSelector((state:RootState)=>state.loginUserSlice.token)

    const handleDelete = async()=>{
        if (!account || !token){
            return router.push('/login')
        }
        // API request
        try {
            dispatch(setReloading(true))
            const data = await commentHide(comment_id,token);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            dispatch(setReloading(false))
        }
    }

    return(
        <button onClick={handleDelete}>
            <TbTrashXFilled/>
        </button>
    )
}

export default CommentDelete