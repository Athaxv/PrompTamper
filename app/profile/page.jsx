"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const MyProfile = () => {
  const handleEdit = () => {

  }
  const handleDelete = async () => {

  }
  return (
    <Profile
      name="My"
      desc="Welcome to your Personalized Profile Page"
      data={[]}
      handleEdit={handleEdit}
      hadleDelete={handleDelete}
    />
  )
}

export default MyProfile