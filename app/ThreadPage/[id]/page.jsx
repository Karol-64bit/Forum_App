import AddPost from '@/app/(components)/AddPost'
import PostsByThread from '@/app/(components)/PostsByThread'
import ThreadInfo from '@/app/(components)/ThreadInfo'
import React from 'react'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

const ThreadPaga = async ({params}) => {
  const session = await getServerSession(options)

  return (
    <div>
      <ThreadInfo threadId={params.id} />

      <PostsByThread threadId={params.id} />


      {session && <AddPost threadId={params.id}/>}


    </div>
  )
}

export default ThreadPaga
