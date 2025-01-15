"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'

const PromptCard = ({post, handletagClick, handleEdit, handleDelete}) => {
  const [copy, setCopy] = useState("");

  const handleCopy = () => {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopy(""), 3000)
  }
  return (
    <div className='prompt_card'>
    <div className='flex justify-between items-start gap-5'>
      <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
        <Image
          src={post.creator.image}
          alt="user"
          width={40}
          height={40}
          className='rounded-full object-contain'
        ></Image>
        <div className='flex flex-col'>
        <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
        <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
        </div>
      </div>
      <div className='copy_btn' onClick={handleCopy}>
      <Image
        src={ copy === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
        width={12}
        height={12}
        />
      </div>
    </div>
    <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
    <p className='font-inter text-sm blue_gradient cursor-pointer' onclick={() => handletagClick && handletagClick(post.tag)}>
    #{post.tag}
    </p>
    </div>
  )
}

export default PromptCard