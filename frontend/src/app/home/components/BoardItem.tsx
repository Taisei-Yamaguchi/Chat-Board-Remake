"use client"
import React, { FC ,useEffect} from 'react';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import BoardDelete from './BoardDelete';
import { Board } from '@/interfaces';

type Props = {
    board:Board;
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

    useEffect(()=>{
        console.log(account)
    },[account])

    useEffect(()=>{
        console.log(board.account)
    },[board])
    return (
        
        <li className='flex flex-row justify-between border-b p-2 w-full'>
            <a className="link link-primary" href={`./board/${board.id}`}>
                {/* title */}
                {board.id}. 
                {board.title}
            </a>

            <div className='text-xs'>
                {/* delete action */}
                {account && board.account && account.id===board.account.id ?(
                    <BoardDelete board_id={board.id}/>
                    ):(
                        <></>
                    )}
                {formattedDate}
            </div>
        </li>
    );
};

export default BoardItem;
