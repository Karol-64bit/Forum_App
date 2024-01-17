import AddPost from '@/app/(components)/AddPost'
import PostsByThread from '@/app/(components)/PostsByThread'
import ThreadInfo from '@/app/(components)/ThreadInfo'
import React from 'react'

const ThreadPaga = ({params}) => {
  return (
    <div>
      <ThreadInfo threadId={params.id} />

      <PostsByThread threadId={params.id} />

      <AddPost threadId={params.id}/>
    </div>
  )
}

export default ThreadPaga
