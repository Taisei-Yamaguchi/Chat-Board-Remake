"use client"
import React, { FC ,useEffect,useState} from 'react';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import { useAppDispatch } from '@/store';
import { get_board_detail } from '@/django_api/get_board';
import BoardCommentList from '../components/BoardCommentList';
import { setAccount } from '@/store/slices/loginUser.slice';
import { setToken } from '@/store/slices/loginUser.slice';
import CreateBoardComment from '../components/BoardCommentCreate';
import BoardHeader from '../components/BoardHeader';
import ImageCreate from '../components/ImageCreate';

type Props = {
    params:{id:number};
};

const BoardPage: FC<Props> = ({ params:{id} }) => {
    const dispatch = useAppDispatch();
    const reloading = useAppSelector((state: RootState) => state.reloadSlice.reloading);
    const account = useAppSelector((state:RootState)=>state.loginUserSlice.account);
	const token = useAppSelector((state:RootState)=>state.loginUserSlice.token);
    const [board,setBoard] = useState<null | {id:Number,title:string,account:{id:number,username:string}, comments:[]}>(null);
    
    useEffect(() => {
        const fetchLoginUserFromCookie = async () => {
            try {
                // get loginUserInfo from cookie
				const response = await fetch("/api/auth");
				if (response.ok) {
                    const data = await response.json();
					dispatch(setAccount(data.account));
                	dispatch(setToken(data.token));
                } else {
                    console.error("Failed to fetch login user");
					dispatch(setAccount(null));
                	dispatch(setToken(null));
                }
            } catch (error) {
                console.error('Error fetching login user from cookie:', error);
            }
        };
        fetchLoginUserFromCookie();
    }, []); 

    useEffect(() => {
        fetchData();
    }, [account,token,reloading]);


    const fetchData = async () => {
        // API request
        try {
            // dispatch(setSearchLoad(true))
            const data = await get_board_detail(id)
            setBoard(data.board)
            
            // dispatch(setTotalPages(data.total_pages));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally{
            // dispatch(setSearchLoad(false))
        }
    };

    return (
        
        <div className='flex flex-row justify-between border-b p-2 w-full'>
            {board &&(
                <>
                    <BoardHeader boardTitle={board.title}/>
                    <BoardCommentList boardTitle={board.title} boardAccountId={board.account.id} comments={board.comments}/>
                    <ImageCreate board_id={id}/>
                    <CreateBoardComment board_id={id}/>
                </>
            )}
            
        </div>
    );
};

export default BoardPage;
