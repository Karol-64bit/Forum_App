import React from 'react'

const getThreadsById = async (id) => {
  try{
    const res = await fetch(`http://localhost:3000/api/Thread/${id}`,{
      cache: "no-store"
    })

    if(!res.ok){
      throw new Error("Failed to get the ticket")
    }

    return res.json();
  } catch (error){
    console.log(error)
  }
}

const SectionPage = async ({params}) => {

    const {data} = await getThreadsById(params.id);

    return (
        <div>
            {params.id}
            {data?.map(thread => (
                <div key={thread._id}>
                    {thread._id}
                    {thread.name}
                </div>
            ))}
        </div>
    )
}

export default SectionPage