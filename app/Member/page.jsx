import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import AddPost from '../(components)/AddPost'
import AddSection from '../(components)/AddSection'
import AddThread from '../(components)/AddThread'
import UploadAvatar2 from '../(components)/UploadAvatar2'
import UploadAvatar from '../(components)/UploadAvatar'

const Member = async () => {

  const session = await getServerSession(options)

  if(!session){
    redirect("/Login")
  }
  return (
    <div>
      <h1>Member Server Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
      <p>{session?.user?.id}</p>
      <p>{session?.user?.avatar}</p>
      <p>{session?.user?.name}</p>
      <img src={session?.user?.avatar} alt={session?.user?.name} />

      {/* <UploadAvatar2 /> */}

      <UploadAvatar />

      {/* <AddPost threadId={2} /> */}

      {/* <AddSection /> */}

      {/* <AddThread sectionId={"659d2a0b775b9b755c692243"}/> */}
    </div>
  )
}

export default Member
