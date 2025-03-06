"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
	  const fetchUserDetails = async () => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
		  document.documentElement.setAttribute("data-theme", savedTheme);
		}
		const accessToken = localStorage.getItem("accessToken");
		if (!accessToken) {
		router.push("/login");
	  }
  
		const userRes = await fetch(`https://dummyjson.com/user/me`, {
		  method: "GET",
		  headers: {
			Authorization: `Bearer ${accessToken}`,
		  },
		});
		if (!userRes.ok) {
		router.push("/login");
	  }
	  if (userRes.ok) {
		router.push("/home");
	  }
	  };
  
	  fetchUserDetails().catch((error) => {
		console.error(error);
	    router.push("/login");
	  });
	}, []);

  return (
    <>
	
	</>
  );
}
