import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import AddPost from '../(components)/AddPost'

const Member = async () => {

  const session = await getServerSession(options)

  if(!session){
    redirect("/api/auth/signin?callbackUrl=/Member")
  }
  return (
    <div>
      <h1>Member Server Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
      <p>{session?.user?.id}</p>
      <AddPost threadId={2} />
    </div>
  )
}

export default Member
