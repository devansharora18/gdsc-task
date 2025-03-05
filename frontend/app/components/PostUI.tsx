import React from "react";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Post } from "./Interfaces";
import Image from "next/image";
import Link from "next/link";

const PostUI: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Link href={`/post/${post.id}`} className="block">
      <div className="p-5 w-full bg-[var(--card)] border border-[var(--input)] rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200">
        
        <div className="flex items-center space-x-3 mb-3">
          <Image src={post.user?.image || "https://dummyjson.com/user/1"} alt="User" width={40} height={40} className="rounded-full bg-black border border-[var(--secondary)]" />

          <span className="font-medium text-lg text-[var(--foreground)]">{post.user?.username || "Anonymous"}</span>
        </div>

        <h2 className="text-lg font-semibold mb-1 text-[var(--foreground)]">{post.title}</h2>
        <p className="text-sm text-[var(--secondary-foreground)]">{post.body}</p>

        <div className="flex flex-col gap-3 mt-4 text-sm">
          <div className="flex space-x-3 items-center text-[var(--secondary-foreground)]">
            <ThumbsUp size={18} />
            <span>{post.reactions.likes}</span>
            <ThumbsDown size={18} />
            <span>{post.reactions.dislikes}</span>
            <MessageSquare size={18} />
            <span>{post.comments?.length || 0}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-[var(--input)] rounded-md text-xs text-[var(--secondary-foreground)]">
                #{tag}
              </span>
            ))}
          </div>
        </div>
		{post.comments && post.comments.length > 0 && (
        <div className="mt-4 p-3 bg-[var(--input)] rounded-md text-sm text-[var(--secondary-foreground)] border-l-4 border-[var(--primary)]">
          <div className="flex items-center space-x-3">
            
		

            <span className="font-medium text-[var(--foreground)]">{post.comments[0].user?.username || "Unknown"}</span>
          </div>
          <p className="mt-1 text-[var(--secondary-foreground)]">{post.comments[0].body}</p>
        </div>
      )}

      </div>
    </Link>
  );
};

export default PostUI;
