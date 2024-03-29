"use client"
import React, { FC ,useEffect, useState} from 'react';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import { useAppDispatch } from '@/store';
import BoardCommentItem from './BoardCommentItem';

type Props = {
    comments:{id:number,content:string,created_at:string,account:{id:number,usernmae:string}}[];
};

const BoardCommentList: FC<Props> = ({ comments }) => {
    const dispatch = useAppDispatch();
    const reloading = useAppSelector((state: RootState) => state.reloadSlice.reloading);
    const account = useAppSelector((state:RootState)=>state.loginUserSlice.account);
	const token = useAppSelector((state:RootState)=>state.loginUserSlice.token);

    useEffect(()=>{
        console.log(comments)
    },[comments])

    return (
        <div className='fixed top-10 left-0 h-[560px] w-full bg-gradient-to-r from-gray-200 to-white z-0  overflow-y-auto'>
            {reloading  ?(
                <>
                    <span className="loading loading-spinner loading-xs"></span>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span className="loading loading-spinner loading-md"></span>
                    <span className="loading loading-spinner loading-lg"></span>
                </>
            ):(
                <>
                {comments &&(
                    <>
                        {comments.length > 0 ? (
                            <ul className='flex flex-col items-center h-full m-2'>
                                {comments.map((comment, index) => (
                                    <BoardCommentItem key={index} comment={comment}/>
                                ))}
                            </ul>
                        ):(
                            <div className='flex flex-col justify-center items-center w-screen h-full'>
                                <div className='text-xl'>No Comments yet</div>
                            </div>
                        )}
                    </>)
                }
                </>
            )}   
        </div>
    );
};

export default BoardCommentList;
