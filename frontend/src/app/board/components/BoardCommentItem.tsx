"use client"
import React, { FC ,useEffect} from 'react';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import CommentDelete from './BoardCommentDelete';

type Props = {
    comment:{id:number,content:string,created_at:string,account:{id:number,usernmae:string}};
};

const BoardCommentItem: FC<Props> = ({ comment }) => {
    const account = useAppSelector((state:RootState)=>state.loginUserSlice.account)
	const formattedDate = new Date(comment.created_at).toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    useEffect(()=>{
        console.log(comment)
    },[comment])

    useEffect(()=>{
        console.log('account',account)
    },[account])

    return (
        
        <li className='flex flex-row justify-between p-2 w-full'>
            <div className="text-sm">
                {/* content */}
                {comment.id}. 
                {comment.content}
            </div>

            <div className='text-xs'>
                {/* delete action */}
                {account && comment.account && account.id===comment.account.id ?(
                    <CommentDelete comment_id={comment.id}/>
                    ):(
                        <></>
                    )}
                {formattedDate}
            </div>
        </li>
    );
};

export default BoardCommentItem;
