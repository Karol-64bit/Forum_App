"use client"

import { useSession } from 'next-auth/react'
import React, {useState, useContext} from 'react'
import { redirect } from 'next/navigation'
import {AppContext} from "@/app/(components)/AppContext";

const AddPost = ({threadId}) => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/")
    },
  });

  const handleAddPost = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Post",{
      method: "POST",
      body: JSON.stringify({formData}),
      "Content-type": "application/json",
    });
    console.log(res);
    if(!res.ok){
        throw new Error("Failed to create new post.");
    }
  }

  const handleChange = (e) => {
    const newId = session?.user?.id
    const newName = session?.user?.name
    const newAvatar = session?.user?.avatar
    const value = e.target.value;
    const updatedFormData = { ...formData, content: value, userId: newId, userName: newName, userAvatarUrl: newAvatar,  };
    setFormData(updatedFormData);
}

  const startingData = {
    userId: "",
    userName: "",
    content: "",
    threadId: threadId
  }

  const [formData, setFormData] = useState(startingData)

  const settings = useContext(AppContext)

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-4xl shadow-lg">
        <div class="md:flex">
            <div class="w-full px-4 py-6 ">

                <div class="mb-2">
                <span class="text-m ">Dodaj nowy post</span>
                <textarea type="text" class="h-24 py-1 px-3 w-full border-2 border-slate-700 rounded focus:outline-none focus:border-blue-600 resize-none" onChange={handleChange} value={formData.content}></textarea>
                </div>   

                <div class="mt-3 text-right">

                <a href="#">Anuluj</a>
                <button class="ml-2 h-10 w-32 bg-slate-700 rounded text-white hover:bg-green-700" onClick={handleAddPost}>Dodaj</button>
                  
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default AddPost
