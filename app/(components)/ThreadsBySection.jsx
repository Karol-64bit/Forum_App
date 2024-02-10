import Link from 'next/link'
import React from 'react'
import Thread from './Thread'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

const getThreadsById = async (id) => {
  try{
    const res = await fetch(`http://localhost:3000/api/Thread/${id}`,{
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

const ThreadsBySection = async ({sectionId}) => {

  const session = await getServerSession(options)
  const userRole = session?.user?.role

    const { foundThreads } = await getThreadsById(sectionId);
    console.log(sectionId);
    return (
      <div>
        {foundThreads?.map((thread) => (
          <div key={thread._id}>
            <Link href={`/ThreadPage/${thread._id}`} className='no-underline'>
              <Thread thread={thread} userRole={userRole}/>
            </Link>
          </div>
        ))}
      </div>
    );
}

export default ThreadsBySection