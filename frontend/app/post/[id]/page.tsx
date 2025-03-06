"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ThumbsUp, ThumbsDown, MessageSquare, X, Eye } from "lucide-react";
import { Post, Comment } from "../../components/Interfaces";
import PostViewSkeleton from "@/app/components/PostViewSkeleton";

const PostView = () => {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
    const fetchPostDetails = async () => {
      try {
        const postRes = await fetch(`https://dummyjson.com/posts/${id}`);
        if (!postRes.ok) throw new Error("Failed to fetch post");
        const postData = await postRes.json();

        const userRes = await fetch(`https://dummyjson.com/users/${postData.userId}`);
        const userData = await userRes.json();
        postData.user = { id: userData.id, username: userData.username, image: userData.image };

        const commentsRes = await fetch(`https://dummyjson.com/posts/${id}/comments`);
        const commentsData = await commentsRes.json();

        const commentsWithUsers = await Promise.all(
          commentsData.comments.map(async (comment: Comment) => {
            const userRes = await fetch(`https://dummyjson.com/users/${comment.user.id}`);
            const userData = await userRes.json();
            return {
              ...comment,
              user: { id: userData.id, username: userData.username, image: userData.image },
            };
          })
        );

        postData.comments = commentsWithUsers;
        setPost(postData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  if (loading) return <PostViewSkeleton/>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="flex items-center justify-center bg-[var(--background)] bg-opacity-50 backdrop-blur-md z-50 h-screen w-screen">
      <div
        className="bg-[var(--background)] w-full md:max-w-7xl relative h-full"
      >

        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 bg-[var(--input)] hover:bg-[var(--secondary)] transition p-2 rounded-full"
        >
          <X size={20} className="text-[var(--secondary-foreground)]" />
        </button>


        <div className="flex items-center space-x-4 p-4 border-b border-[var(--secondary)]">
  <Image
    src={post?.user?.image || "https://dummyjson.com/user/1"}
    alt="User"
    width={50}
    height={50}
    className="rounded-full border border-[var(--secondary)] cursor-pointer"
    onClick={() => router.push(`/user/${post?.user?.id}`)}
  />
  <span 
    className="font-semibold text-lg text-[var(--foreground)] cursor-pointer"
    onClick={() => router.push(`/user/${post?.user?.id}`)}
  >
    {post?.user?.username || "Anonymous"}
  </span>
</div>



        <div className="p-5">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{post?.title}</h2>
          <p className="text-md text-[var(--secondary-foreground)] mt-2 leading-relaxed">{post?.body}</p>
        </div>


        <div className="flex items-center justify-between px-5 py-4 border-t border-[var(--secondary)] text-[var(--secondary-foreground)]">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-blue-500 transition">
              <ThumbsUp size={20} />
              <span>{post?.reactions?.likes || 0}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-red-500 transition">
              <ThumbsDown size={20} />
              <span>{post?.reactions?.dislikes || 0}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-green-500 transition">
              <MessageSquare size={20} />
              <span>{post?.comments?.length || 0}</span>
            </button><button className="flex items-center space-x-1 hover:text-green-500 transition">
              <Eye size={20} />
              <span>{post?.views || 0}</span>
            </button>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Comments</h3>
          <div className="space-y-4">
            {post?.comments?.map((comment, index) => (
              <div key={index} className="flex space-x-3 items-start hover:bg-[var(--secondary)] transition p-2 rounded-lg">
			  <Image
				src={comment.user?.image || "https://dummyjson.com/user/1"}
				alt="User"
				width={35}
				height={35}
				className="rounded-full border border-[var(--secondary)] cursor-pointer"
				onClick={() => router.push(`/user/${comment.user?.id}`)}
			  />
			  <div className="bg-[var(--input)] rounded-lg p-3 w-full shadow-sm">
				<span 
				  className="font-medium text-[var(--foreground)] cursor-pointer"
				  onClick={() => router.push(`/user/${comment.user?.id}`)}
				>
				  {comment.user?.username || "Unknown"}
				</span>
				<p className="text-[var(--secondary-foreground)] text-sm mt-1">{comment.body}</p>
			  </div>
			</div>
			
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
