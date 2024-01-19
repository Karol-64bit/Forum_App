import React from 'react'
import Image from 'next/image'

const getThreadInfo = async (id) => {
    try{
      const res = await fetch(`http://localhost:3000/api/ThreadInfo/${id}`,{
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


const ThreadInfo = async ({threadId}) => {

  const { threadInfo } = await getThreadInfo(threadId);

  const time = threadInfo.createdAt

    return (
      <div className='flex my-8 justify-center'>  
        <div className="rounded-xl border p-5 shadow-md w-7/12 bg-white">
          <div className="flex w-full items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-3">
              <Image src={threadInfo.userAvatarUrl} alt="test" width={100} height={100} className='h-12 w-12 rounded-full'/>
              <div className="text-lg font-bold text-slate-700">{threadInfo.userName}</div>
            </div>
            <div className="flex items-center space-x-8">
              <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">Category</button>
              <div className="text-xs text-neutral-500">{time}</div>
            </div>
          </div>
          <div className="mt-4 mb-6">
            <div className="mb-3 text-xl font-bold">{threadInfo.title}</div>
            <div className="text-sm text-neutral-600">{threadInfo.question}</div>
          </div>
        </div>
      </div>
)
}

export default ThreadInfo
