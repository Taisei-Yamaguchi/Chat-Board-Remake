"use client"
import React, { FC, useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '@/store';
import { useAppSelector } from '@/store';
import { board_search } from '@/django_api/get_board';
// import { setTotalPages } from '@/store/slices/snackResult.slice';
import { setSearchLoad } from '@/store/slices/reload.slice';
import { setSearchBoardResult } from '@/store/slices/searchBoardResult.slice';

// type Props = {
//     page: number;
// };

const BoardSearch = () => {
    const dispatch = useAppDispatch();
    const reloading = useAppSelector((state: RootState) => state.reloadSlice.reloading);
    const account = useAppSelector((state:RootState)=>state.loginUserSlice.account)
	const token = useAppSelector((state:RootState)=>state.loginUserSlice.token)
    const [keyword, setKeyword] = useState<string>('');

    useEffect(() => {
        handleSearch();
    }, [account,token,reloading]);

    const handleSearch = async () => {
        // API request
        try {
            dispatch(setSearchLoad(true))
            const data = await board_search(keyword)
            console.log(data)
            
            dispatch(setSearchBoardResult(data.boards));
            // dispatch(setTotalPages(data.total_pages));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally{
            dispatch(setSearchLoad(false))
        }
    };

        return (
        <div className="bg-gradient-to-r from-gray-300 to-white w-full fixed p-1 top-14 z-20  m-0 p-1 h-50 rounded flex justify-evenly  max-md:flex-col">
            <div className="w-3/4 max-md:w-full">
                <div className=' w-full flex flex-wrap items-center'>
                    <label className="w-full input input-sm input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Keyword" value={keyword} onChange={e => setKeyword(e.target.value)} />
                    </label>
                    
                    <button onClick={handleSearch} className="btn btn-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}


export default BoardSearch;
