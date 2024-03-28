"use client"
import React, { FC } from 'react';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
// import DeleteSnack from './DeleteSnack';

type Props = {
    board:{id:number,title:string,created_at:string};
};

const BoardItem: FC<Props> = ({ board }) => {
    const account = useAppSelector((state:RootState)=>state.loginUserSlice.account)
	const formattedDate = new Date(board.created_at).toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    return (
        
        <li className='flex flex-row justify-between border-b p-2 w-full'>
            <h2 className="">
                {/* title */}
                {board.id}. 
                {board.title}
            </h2>

            <div className='text-xs'>
                {formattedDate}
            </div>
        </li>
    );
};

export default BoardItem;
