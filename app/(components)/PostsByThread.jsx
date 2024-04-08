import React from 'react'
import PostCard from './PostCard'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

const getPostsById = async (id) => {
  try{
    const res = await fetch(`http://localhost:3000/api/Post/${id}`,{
      type: 'GET',
      cache: "no-store"
    })
    if(!res.ok){
      throw new Error("Błąd w pobieraniu postów")
    }
    console.log(res)
    return res.json();
  } catch (error){
    console.log(error)
  }
}

const PostsByThread = async ({threadId}) => {

  const session = await getServerSession(options)
  const userRole = session?.user?.role

  const { foundPosts } = await getPostsById(threadId);

  return (
    <div>
      {foundPosts?.map((post) => (
        <div key={post._id}>
          <PostCard postData={post} userRole={userRole}/>
        </div>
      ))}
    </div>
  );
}

export default PostsByThread