import React from 'react'
import UserProfile from '../(components)/UserProfile'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import Post from '../(models)/Post'

const User = async () => {

  const session = await getServerSession(options);
  const userData = session?.user

  const posts = await Post.find({ userId: userData.id });
  const postCount = posts.length;
  
  console.log("Liczba postów:", postCount)

  return (
    <div >
        <UserProfile userData={userData} postCounter={postCount}/>
    </div>
  )
}

export default User
