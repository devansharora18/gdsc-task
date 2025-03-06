"use client";

import { use, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ThumbsUp, ThumbsDown, MessageSquare, Eye } from "lucide-react";
import { Post, User } from "../components/Interfaces";
import ProfileSkeleton from "@/app/components/UserSkeleton";
import { BottomBar } from "../components/Bottombar";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const logout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("No access token found");

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
        const userData = await userRes.json();
        setUser(userData);

        // Fetch user posts
        const postsRes = await fetch(`https://dummyjson.com/users/${userData.id}/posts`);
        if (!postsRes.ok) throw new Error("Failed to fetch user posts");
        const postsData = await postsRes.json();
        setPosts(postsData.posts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex flex-col items-center bg-[var(--background)] min-h-screen w-full p-6">

	  {loading && <ProfileSkeleton />}
      <div className="bg-[var(--card)] p-6 rounded-lg shadow-lg w-full max-w-3xl text-center">
        <Image
          src={user?.image || "https://dummyjson.com/user/1"}
          alt="User Profile"
          width={100}
          height={100}
          className="rounded-full border border-[var(--secondary)] mx-auto"
        />
        <h1 className="text-2xl font-semibold text-[var(--foreground)] mt-3">{user?.username}</h1>
        <p className="text-md text-[var(--secondary-foreground)] mt-2">{user?.email}</p>
        <button
          onClick={logout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* User Posts Section */}
      <div className="w-full max-w-3xl mt-6">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">Posts</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-[var(--card)] p-4 rounded-lg shadow-md mb-4 hover:bg-[var(--input)] transition cursor-pointer"
              onClick={() => router.push(`/post/${post.id}`)}
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">{post.title}</h3>
              <p className="text-[var(--secondary-foreground)] mt-2">{post.body.slice(0, 100)}...</p>
              <div className="flex items-center space-x-4 mt-3 text-[var(--secondary-foreground)]">
                <div className="flex items-center space-x-1">
                  <ThumbsUp size={18} />
                  <span>{post.reactions?.likes || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsDown size={18} />
                  <span>{post.reactions?.dislikes || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare size={18} />
                  <span>{post.comments?.length || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye size={18} />
                  <span>{post.views || 0}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[var(--secondary-foreground)] text-center">No posts available.</p>
        )}
      </div>

      <div>
        <BottomBar />
      </div>
    </div>
  );
};

export default ProfilePage;
