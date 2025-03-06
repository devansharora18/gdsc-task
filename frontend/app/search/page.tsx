"use client";

import React, { useEffect, useState, useMemo } from "react";
import Themeswitcher from "../components/Themeswitcher";
import { BottomBar } from "../components/Bottombar";
import Image from "next/image";
import PostUI from "../components/PostUI";
import PostSkeleton from "../components/PostSkeleton";
import { Post} from "../components/Interfaces";
import { useRouter } from "next/navigation";



const Search = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("desc");
  const [tag, setTag] = useState("");
  const [detailedPosts, setDetailedPosts] = useState<Post[]>([]);
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
			setError("Failed to fetch user details");
			router.push("/login");
		}
	};
  
	fetchUserDetails();
  }, []);


  useEffect(() => {
	const fetchPosts = async () => {
	  setLoading(true);
	  setError(null);
  
	  try {
		const response = await fetch(
		  `https://dummyjson.com/posts/search?q=${query}&limit=241`
		);
		if (!response.ok) throw new Error("Failed to fetch posts");
  
		const data = await response.json();
		setTotal(data.total); // Set total count
		setPosts(data.posts); // Store posts without fetching user/comments
  
	  } catch (err: any) {
		setError(err.message);
	  } finally {
		setLoading(false);
	  }
	};
  
	fetchPosts();
  }, [query]);
  

  const handleSearch = () => {
    setPage(0);
    setPosts([]);
  };

  const handleNextPage = () => {
    if ((page + 1) * 10 < total) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const sortedPosts = useMemo(() => {
	let filteredPosts = posts;
	if (tag) {
	  filteredPosts = posts.filter((post) => post.tags.includes(tag));
	}
  
	const sorted = [...filteredPosts].sort((a, b) => {
	  if (sortBy === "likes") return order === "asc" ? a.reactions.likes - b.reactions.likes : b.reactions.likes - a.reactions.likes;
	  if (sortBy === "popularity") return order === "asc" ? a.views - b.views : b.views - a.views;
	  return order === "asc"
		? new Date(a.id).getTime() - new Date(b.id).getTime()
		: new Date(b.id).getTime() - new Date(a.id).getTime();
	});
  
	return sorted.slice(page * 10, (page + 1) * 10);
  }, [posts, sortBy, order, page, tag]);
  

  useEffect(() => {
	const fetchDetails = async () => {
	  setLoading(true);
	  try {
		const postsWithDetails = await Promise.all(
		  sortedPosts.map(async (post: Post) => {
			const [userRes, commentsRes] = await Promise.all([
			  fetch(`https://dummyjson.com/users/${post.userId}`),
			  fetch(`https://dummyjson.com/posts/${post.id}/comments`)
			]);
  
			if (!userRes.ok || !commentsRes.ok) throw new Error("Failed to fetch details");
  
			const userData = await userRes.json();
			const commentsData = await commentsRes.json();
  
			return {
			  ...post,
			  user: {
				id: userData.id,
				username: userData.username,
				image: userData.image,
        fullName: userData.fullName,
        email: userData.email,
        },
			  comments: commentsData.comments,
			};
		  })
		);
  
		setDetailedPosts(postsWithDetails);
	  } catch (err: any) {
		setError(err.message);
	  } finally {
		setLoading(false);
	  }
	};
  
	fetchDetails();
  }, [sortedPosts]);
  
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-16">
      <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-[var(--background)] shadow-md z-50 border-b border-[var(--input)]">
        <div className="flex items-center space-x-4">
          <Image src={"/gdsc.svg"} alt="GDSC Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold">GDSC HUB</h1>
        </div>
        <Themeswitcher />
      </div>

      <div className="flex-1 w-full max-w-screen-sm mx-auto p-4 mt-16 space-y-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="flex-1 p-2 border border-[var(--input)] rounded"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <div className="flex items-center space-x-4 mt-4 overflow-x-auto scrollbar-hide">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-[var(--input)] rounded bg-[var(--background)] text-[var(--foreground)]"
          >
            <option value="date">Date</option>
            <option value="likes">Likes</option>
            <option value="popularity">Popularity</option>
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="p-2 border border-[var(--input)] rounded bg-[var(--background)] text-[var(--foreground)]"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="p-2 border border-[var(--input)] rounded bg-[var(--background)] text-[var(--foreground)]"
          >
            <option value="">All Tags</option>
            <option value="american">american</option>
            <option value="english">english</option>
            <option value="french">french</option>
          </select>
        </div>

        {loading ? <PostSkeleton /> : detailedPosts.map((post) => <PostUI key={post.id} post={post} />)}

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 0}
            className="p-2 border border-[var(--input)] rounded bg-[var(--background)] text-[var(--foreground)]"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={(page + 1) * 10 >= total}
            className="p-2 border border-[var(--input)] rounded bg-[var(--background)] text-[var(--foreground)]"
          >
            Next
          </button>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default Search;