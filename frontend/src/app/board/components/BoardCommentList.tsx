"use client"
import React, { FC ,useEffect, useState} from 'react';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import { useAppDispatch } from '@/store';
import BoardCommentItem from './BoardCommentItem';

type Props = {
    boardTitle:string;
    boardAccountId:number;
    comments:{id:number,content:string,created_at:string,account:{id:number,usernmae:string},reply_to_comment:number|null}[];
};

const BoardCommentList: FC<Props> = ({boardTitle,boardAccountId, comments }) => {
    const dispatch = useAppDispatch();
    const reloading = useAppSelector((state: RootState) => state.reloadSlice.reloading);
    const account = useAppSelector((state:RootState)=>state.loginUserSlice.account);
	const token = useAppSelector((state:RootState)=>state.loginUserSlice.token);

    useEffect(()=>{
        console.log(comments)
    },[comments])

    return (
        <div className='fixed top-14 left-0 h-[550px] w-full bg-gradient-to-r from-gray-200 to-white z-0  overflow-y-auto'>
                {boardTitle}
                {comments &&(
                    <>
                        {comments.length > 0 ? (
                            <ul className='flex flex-col items-center h-full m-2'>
                                {comments.map((comment, index) => (
                                    <BoardCommentItem key={index} comment={comment} boardAccountId={boardAccountId}/>
                                ))}
                            </ul>
                        ):(
                            <div className='flex flex-col justify-center items-center w-screen h-full'>
                                <div className='text-xl'>No Comments yet</div>
                            </div>
                        )}
                    </>)
                }
                
        
        </div>
    );
};

export default BoardCommentList;
