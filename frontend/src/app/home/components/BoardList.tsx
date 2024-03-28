"use client"
import { useSelector } from 'react-redux';
import { RootState } from '@/store'; 
import { useAppSelector } from '@/store';
import { useEffect } from 'react';
import BoardItem from './BoardItem';

const BoardList = () => {
    const searchBoardResult = useSelector((state: RootState) => state.searchBoardResultSlice.searchBoardResult);
    const reloading = useAppSelector((state: RootState) => state.reloadSlice.reloading);
    const searchLoad = useAppSelector((state: RootState) => state.reloadSlice.searchLoad);

    useEffect(()=>{
        console.log(searchBoardResult)
    },[searchBoardResult])
    return (
        <div className='fixed top-40 left-0 h-[500px] w-full bg-gradient-to-r from-gray-200 to-white z-0  overflow-y-auto'>
            {reloading || searchLoad ?(
                <>
                    <span className="loading loading-spinner loading-xs"></span>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span className="loading loading-spinner loading-md"></span>
                    <span className="loading loading-spinner loading-lg"></span>
                </>
            ):(
                <>
                {searchBoardResult &&(
                    <>
                        {searchBoardResult.length > 0 ? (
                            <ul className='flex flex-col items-center h-full m-2'>
                                {searchBoardResult.map((board, index) => (
                                    <BoardItem key={index} board={board}/>
                                ))}
                            </ul>
                        ):(
                            <div className='flex flex-col justify-center items-center w-screen h-full'>
                                <div className='text-xl'>No Result</div>
                                <div className='text-sm'>Please try different search.</div>
                            </div>
                        )}
                    </>)
                }
                </>
            )}   
        </div>
    );
};

export default BoardList;
