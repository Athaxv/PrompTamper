"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@/components/Profile'

const MyProfile = () => {
  const { data: session} = useSession()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${session?.user.id}/posts`)
      const data = await response.json();
      setPosts(data);
    }
    console.log(posts)
    fetchPosts()
  }, [])
  const handleEdit = () => {

  }
  const handleDelete = async () => {

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