"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

const PromptCard = ({ post, handletagClick, handleEdit, handleDelete }) => {
  const [copy, setCopy] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    console.log("Rerendered");
  }, [post.creator]);

  useEffect(() => {
    // Debugging logs
    console.log("Session User ID:", session?.user.id);
    console.log("Post Creator ID:", post.creator?._id);
    console.log("Current Path:", pathName);
  }, [session?.user, post.creator, pathName]);

  const handleCopy = () => {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopy(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator?.image || "/assets/icons/new.png"} 
            alt="user"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator?.username || "Anonymous user"}
            </h3>
            <p className="font-inter text-sm text-gray-500">{post.creator?.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copy === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt="tick"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handletagClick && handletagClick(post.tag)}>
        #{post.tag}
      </p>

      {/* Ensure correct comparison for the edit and delete buttons */}
      {session?.user.id == post.creator?._id && pathName === '/profile' && (
        <div className="gap-4 flex-end border-t border-gray-100 pt-2">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
