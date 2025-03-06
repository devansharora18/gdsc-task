"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Post } from "../../components/Interfaces";
import PostCard from "../../components/PostUI";
import UserSkeleton from "../../components/UserSkeleton";

const UserView = () => {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  
		// Fetch user details
		const userRes = await fetch(`https://dummyjson.com/user/me`, {
		  method: "GET",
		  headers: {
			Authorization: `Bearer ${accessToken}`,
		  },
		});
		if (!userRes.ok) {
		router.push("/login");
	  }
	  };
  
	  fetchUserDetails().catch((error) => {
		console.error(error);
	  setError("Failed to fetch user details");
	  router.push("/login");
	  });
	}, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await fetch(`https://dummyjson.com/users/${id}`);
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();

        const postsRes = await fetch(`https://dummyjson.com/users/${id}/posts`);
        const postsData = await postsRes.json();

        setUser(userData);
        setPosts(postsData.posts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) return <UserSkeleton />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="flex flex-col items-center bg-[var(--background)] min-h-screen p-5">
      <div className="w-full max-w-3xl p-6 rounded-lg shadow-lg">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-[var(--secondary-foreground)] hover:text-[var(--foreground)] transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="flex flex-col items-center mt-5">
          <Image
            src={user?.image || "https://dummyjson.com/user/1"}
            alt="User"
            width={100}
            height={100}
            className="rounded-full border border-[var(--secondary)]"
          />
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-3">{user?.username}</h2>
          <p className="text-md text-[var(--secondary-foreground)]">{user?.email}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">User's Posts</h3>
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <p className="text-[var(--secondary-foreground)]">No posts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
