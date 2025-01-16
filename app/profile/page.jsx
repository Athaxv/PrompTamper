"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@/components/Profile'

const MyProfile = () => {
  const { data: session} = useSession()
  const [posts, setPosts] = useState([])
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${session?.user.id}/posts`)
      const data = await response.json();
      setPosts(data);
    }
    console.log(posts)
    fetchPosts()
  }, [])
  useEffect(() => {
    if (!session?.user){
      router.replace('/')
    }
  }, [session?.user])
  const handleEdit = () => {
    router.push(`/update-prompt?id=${posts._id}`)
  }
  const handleDelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?")
    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${posts._id.toString()}`, {
          method: 'DELETE'
        })

        const filteredPosts = posts.filter((p) => p._id !== posts._id);
        setPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <Profile
      name="My"
      desc="Welcome to your Personalized Profile Page"
      data={posts}
      handleEdit={handleEdit}
      hadleDelete={handleDelete}
    />
  )
}

export default MyProfile