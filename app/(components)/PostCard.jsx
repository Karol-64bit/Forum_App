import React from 'react'
import Image from 'next/image'

const PostCard = ({postData}) => {
    {/* {postData} */}
  return (
    <div>
        {postData.content}
    </div>
  )
}

export default PostCard
