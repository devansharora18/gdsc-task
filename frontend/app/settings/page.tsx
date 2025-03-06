"use client"

import React, { useEffect } from 'react'
import { BottomBar } from '../components/Bottombar'
import { useRouter } from 'next/navigation'

const Settings = () => {

const router = useRouter();

  useEffect(() => {
	const fetchUserDetails = async () => {
		try {
			const savedTheme = localStorage.getItem("theme");
			if (savedTheme) {
				document.documentElement.setAttribute("data-theme", savedTheme);
			}
			const accessToken = localStorage.getItem("accessToken");
			if (!accessToken) {
				router.push("/login");
				return;
			}

			// Fetch user details
			const userRes = await fetch(`https://dummyjson.com/user/me`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (!userRes.ok) {
				router.push("/login");
				return;
			}
		} catch (error) {
			console.error(error);
			router.push("/login");
		}
	};

	fetchUserDetails();
}, []);

  return (
	<div className="flex flex-col items-center justify-center w-full h-screen">
	  <h1>Settings</h1>
	  <div>
		<BottomBar />
	  </div>
	</div>
  )
}

export default Settings