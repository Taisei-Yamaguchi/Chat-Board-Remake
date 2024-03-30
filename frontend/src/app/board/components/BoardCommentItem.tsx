"use client"
import React, { FC ,useEffect} from 'react';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import CommentDelete from './BoardCommentDelete';
import { useAppDispatch } from '@/store';
import { setCommentReply } from '@/store/slices/commentReply.slice';
import { Comment } from '@/interfaces';

type Props = {
    boardAccountId:number;
    comment:Comment;
};

const BoardCommentItem: FC<Props> = ({ comment,boardAccountId }) => {
    const dispatch = useAppDispatch()
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

    const handleSetReply=(comment_id:number)=>{
        dispatch(setCommentReply(comment_id))
    }

    return (
        
        <li className='flex flex-row justify-between p-1 w-full'>
            <div className="text-sm flex-col w-full border border-slate-300">
                {/* content */}
                <div className='flex w-full '>
                    <div className='mx-2'>{comment.id}:</div>
                    <div className='text-xs flex w-1/3 max-sm:w-full justify-between'>
                        <button className='flex link link-hover' onClick={() => handleSetReply(comment.id)}>
                            {comment.account.id===boardAccountId ?(
                                <div className='text-green-600'>うぷ主:</div>
                            ):
                                <div className='text-orange-400'>名無しさん(仮):</div>
                            }
                            {/* created_at */}
                            {formattedDate}
                        </button>
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
                {comment.image_url&&(
                    <img src={comment.image_url} className='h-40'/>
                )}
                {comment.content&&(
                    <div>{comment.content}</div>
                )}
            </div>

            
        </li>
    );
};

export default BoardCommentItem;
