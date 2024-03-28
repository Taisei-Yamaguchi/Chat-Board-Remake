"use client"

import HomeHeader from "./components/HomeHeader";
import BoardSearch from "./components/BoardSearch";
import { useEffect,useState } from "react";
import { useAppDispatch } from "@/store";
import { setAccount } from "@/store/slices/loginUser.slice";
import { setToken } from "@/store/slices/loginUser.slice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import BoardList from "./components/BoardList";

export default function Home() {
	const dispatch=useAppDispatch()

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
	
	return (
		<div className=" h-screen bg-white">
			<div className="bg-gradient-to-r from-purple-500 to-pink-500 ">
				<HomeHeader />
			</div>
			<div>
				<BoardSearch/>
			</div>
			<div className="">
				<BoardList/>
			</div>
		</div>
	);
}