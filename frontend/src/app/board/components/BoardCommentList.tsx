"use client"
import React, { FC ,useEffect, useRef} from 'react';
import BoardCommentItem from './BoardCommentItem';
import { Comment } from '@/interfaces';
import { IoReload } from 'react-icons/io5';
import { BiArrowToTop } from 'react-icons/bi';
import { BiArrowToBottom } from 'react-icons/bi';

type Props = {
    boardTitle:string;
    boardAccountId:number;
    comments:Comment[];
};

const BoardCommentList: FC<Props> = ({boardTitle,boardAccountId, comments }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToDown()
    }, [comments]); 

    const scrollToTop = () => {
        if (scrollRef.current) {
            // scroll to top
            scrollRef.current.scrollTop = 0;
        }
    };
    const scrollToDown = () => {
        if (scrollRef.current) {
            // scroll to down
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    const handleReloadPage = () => {
        window.location.reload();
    };


    return (
        <div ref={scrollRef} className='fixed top-14 left-0 h-[525px] w-full bg-gradient-to-r from-gray-200 to-white z-0  overflow-y-auto'>
                {/* scroll to Top */}
                <button onClick={scrollToTop} className="z-50  fixed bottom-14 right-4 bg-gray-300 hover:bg-gray-400 text-xs text-white font-bold py-2 px-4 rounded">
                    <BiArrowToTop size={15}/>
                </button>
                {/* scroll to Top */}
                <button onClick={scrollToDown} className="z-50  fixed bottom-4 right-4 bg-gray-300 hover:bg-gray-400 text-xs text-white font-bold py-2 px-4 rounded">
                    <BiArrowToBottom size={15}/>
                </button>
                {/* reload */}
                <button onClick={handleReloadPage} className="z-50 fixed bottom-24 right-4 bg-gray-300 hover:bg-gray-400 text-xs text-white font-bold py-2 px-4 rounded">
                    <IoReload size={15}/>
                </button>
                <div className='fixed top-18 bg-gradient-to-r from-gray-200 to-white w-full text-sm'>{boardTitle}</div>
                {comments &&(
                    <>
                        {comments.length > 0 ? (
                            <ul className='flex flex-col items-center h-full m-2 mt-16'>
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
