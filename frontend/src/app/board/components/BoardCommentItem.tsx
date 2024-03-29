"use client"
import React, { FC ,useEffect} from 'react';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import CommentDelete from './BoardCommentDelete';

type Props = {
    boardAccountId:number;
    comment:{id:number,content:string,created_at:string,account:{id:number,usernmae:string},reply_to_comment:number|null};
};

const BoardCommentItem: FC<Props> = ({ comment,boardAccountId }) => {
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
        
        <li className='flex flex-row justify-between p-1 w-full'>
            <div className="text-sm flex-col w-full border">
                {/* content */}
                <div className='flex w-full '>
                    <div className='mx-2'>{comment.id}:</div>
                    <div className='text-xs flex w-1/3 max-sm:w-full justify-between'>
                        {comment.account.id===boardAccountId ?(
                            <div className='text-green-600'>うぷ主:</div>
                        ):
                            <div className='text-orange-400'>名無しさん(仮):</div>
                        }
                        {/* created_at */}
                        {formattedDate}
                        {/* delete action */}
                        {account && comment.account && account.id===comment.account.id ?(
                            <CommentDelete comment_id={comment.id}/>
                            ):(
                                <></>
                            )}
                    </div>
                </div> 
                {comment.reply_to_comment && (
                    <div>{`＞＞`}{comment.reply_to_comment}</div>
                )}
                <div>{comment.content}</div>
            </div>

            
        </li>
    );
};

export default BoardCommentItem;
