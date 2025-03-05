"use client";

import React, { useEffect, useState, useCallback } from "react";
import Themeswitcher from "../components/Themeswitcher";
import { BottomBar } from "../components/Bottombar";
import Image from "next/image";
import PostUI from "../components/PostUI";
import PostSkeleton from "../components/PostSkeleton";
import { Comment, Post } from "../components/Interfaces";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();


  useEffect(() => {
	const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
	document.documentElement.setAttribute("data-theme", savedTheme);
  }
  const token = localStorage.getItem("accessToken");
  if (!token) {
	router.push("/login");
  }
  }, []);

  const fetchPosts = useCallback(async () => {
	if (isFetching) return;

	
  
	setIsFetching(true);
	try {
	  const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${page * 10}`);
	  if (!response.ok) throw new Error("Failed to fetch posts");
  
	  const data = await response.json();
	  const postsWithDetails = await Promise.all(
		data.posts.map(async (post: Post) => {
		  const commentsRes = await fetch(`https://dummyjson.com/posts/${post.id}/comments`);
		  const commentsData = await commentsRes.json();
  
		  const commentsWithUserDetails = await Promise.all(
			commentsData.comments.map(async (comment: Comment) => {
			  const userRes = await fetch(`https://dummyjson.com/users/${comment.user.id}`);
			  const userData = await userRes.json();
  
			  return {
				...comment,
				user: {
				  id: userData.id,
				  username: userData.username,
				  fullName: userData.fullName,
				  image: userData.image,
				},
			  };
			})
		  );
  
		  post.comments = commentsWithUserDetails;
  
		  const userRes = await fetch(`https://dummyjson.com/users/${post.userId}`);
		  const userData = await userRes.json();
      post.user = { id: userData.id, username: userData.username, image: userData.image, fullName: userData.fullName, email: userData.email };
  
		  return post;
		})
	  );
  
	  setPosts((prev) => {
		const existingIds = new Set(prev.map((p) => p.id));
		const newPosts = postsWithDetails.filter((p) => !existingIds.has(p.id));
		return [...prev, ...newPosts];
	  });
  
	  setPage((prev) => prev + 1);
	} catch (err: any) {
	  setError(err.message);
	} finally {
	  setLoading(false);
	  setIsFetching(false);
	}
  }, [page, isFetching]);
  

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !isFetching) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchPosts, isFetching]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      
      <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-[var(--background)] shadow-md z-50 border-b border-[var(--input)]">
        <div className="flex items-center space-x-4">
          <Image src={"/gdsc.svg"} alt="GDSC Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold">GDSC HUB</h1>
        </div>
        <Themeswitcher />
      </div>

      <div className="flex-1 w-full max-w-screen-sm mx-auto p-4 mt-16 space-y-6">
        {loading && 
          <div className="space-y-4">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        }
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && !error && posts.length === 0 && <p className="text-center">No posts available.</p>}

        {!loading && !error && posts.map((post) => <PostUI key={post.id} post={post} />)}
        {isFetching && <PostSkeleton />}
      </div>

      <div className="fixed bottom-0 w-full">
        <BottomBar />
      </div>
    </div>
  );
};

export default HomePage;
