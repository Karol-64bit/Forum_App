import Link from 'next/link'
import React from 'react'
import Thread from './Thread'

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


    const { foundThreads } = await getThreadsById(sectionId);
    console.log(sectionId);
    return (
      <div>
        {sectionId}
        {foundThreads?.map((thread) => (
          <div key={thread._id}>
            <Link href={`/ThreadPage/${thread._id}`}>
              <Thread thread={thread} />
            </Link>
          </div>
        ))}
      </div>
    );
}

export default ThreadsBySection