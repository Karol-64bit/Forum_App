import React from 'react'
import Thread from '../(models)/Thread'
import Image from 'next/image'

const Section = async ({section}) => {

  const foundThreads = await Thread.find({sectionId: section._id});
  foundThreads.sort((a, b) => b.createdAt - a.createdAt);
  const lastTwoThreads = foundThreads.slice(-2);
  console.log(lastTwoThreads)
  return (
    <div className='flex my-8 justify-center'>  
      <div className="rounded-xl border p-5 shadow-md w-7/12 bg-white">
        <div className="mt-4 mb-6 ">
          <div className="mb-3 text-xl font-bold ">{section.title}</div>
          <div className="text-sm text-neutral-600">{section.description}</div>
        </div>
        <hr />
        <div className="text-sm text-neutral-600">Ostanio dodane wątki:</div>

        <div>
          {lastTwoThreads.map((thread) => (
            <div key={thread._id} className=''>
              <div className='flex my-3 justify-center'>  
                <div className="rounded-xl border p-2 shadow-md w-11/12 bg-white">
                  <div className="flex w-full items-center justify-between border-b pb-3">
                    <div className="flex items-center space-x-3">
                      <Image src={thread.userAvatarUrl} alt="test" width={100} height={100} className='h-12 w-12 rounded-full'/>
                      <div className="text-lg font-bold text-slate-700">{thread.userName}</div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="text-xs text-neutral-500">{"23.12.2012"}</div>
                    </div>
                  </div>
                  <div className="mt-4 mb-6">
                    <div className="mb-3 text-xl font-bold">{thread.title}</div>
                    <div className="text-sm text-neutral-600">{thread.question}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Section
