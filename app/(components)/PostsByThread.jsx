import React from 'react'
import PostCard from './PostCard'

const getPostsById = async (id) => {
  try{
    const res = await fetch(`http://localhost:3000/api/Post/${id}`,{
      type: 'GET', // ?
      cache: "no-store"
    })

    if(!res.ok){
      throw new Error("Failed to get the ticket")
    }
    
    console.log(res)
    return res.json();
  } catch (error){
    console.log(error)
  }
}

const PostsByThread = async ({threadId}) => {


    const { foundPosts } = await getPostsById(threadId);
    console.log(foundPosts);
    return (
      <div>
        {threadId}
        {foundPosts?.map((post) => (
          <div key={post._id}>
            <PostCard postData={post} />
          </div>
        ))}
      </div>
    );
}

export default PostsByThread