"use client"

import { useSession } from 'next-auth/react'
import React, {useState} from 'react'
import { redirect } from 'next/navigation'

const AddThread = ({sectionId}) => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?")
    },
  });

  const handleAddSection = async (e) => {
    console.log(formData)
    e.preventDefault();
    const res = await fetch("/api/Thread",{
      method: "POST",
      body: JSON.stringify({formData}),
      "Content-type": "application/json",
    });
    console.log(res);
    setFormData((prevData) => ({ ...prevData,title: "", question: "",stion: ""}));
    if(!res.ok){
        throw new Error("Failed to create new Thread.");
    }
  }


  const [formData, setFormData] = useState({
    userId: session?.user?.id,
    userName: session?.user?.name,
    userAvatarUrl: session?.user?.avatar,
    title: '',
    question: '',
    section: sectionId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData,userId: session?.user?.id, userName: session?.user?.name, userAvatarUrl: session?.user?.avatar, [name]: value }));
  };

  return (
    <div className='flex justify-center'>
      <form method="post" onSubmit={handleAddSection} className="w-full max-w-5xl bg-white rounded-lg px-4 pt-2">
        <div className="flex flex-wrap -mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Dodaj nowy wątek</h2>

          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <input 
              className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'
              id="title" type='text' name="title" onChange={handleChange} value={formData.title}
              placeholder='Tytuł tematu...'
              />
          </div>

          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <textarea 
              className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'
              id="question" type='text' name="question" onChange={handleChange} value={formData.question}
              placeholder='Treść pytania...'
              />
          </div>

          <div className="w-full flex items-start md:w-full px-3">
            <div className='-mr-1'>
              <input className='bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100' type='submit' name="submit" value="Dodaj" />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddThread
