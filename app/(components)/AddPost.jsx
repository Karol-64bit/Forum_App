"use client"

import { useSession } from 'next-auth/react'
import React, {useState, useContext} from 'react'
import { redirect } from 'next/navigation'
import {AppContext} from "@/app/(components)/AppContext";

const AddPost = ({threadId}) => {
  // const {data: session} = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/api/auth/signin?callbackUrl=/ClientMember")
  //   },
  // });

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
    <div>
      <h1>Add new post</h1>
      <form method="post" onSubmit={handleAddPost}>
        <label>Content</label>
        <input id="content" type='text' name="content" onChange={handleChange} value={formData.content}/>
        <input type='submit' name="submit" value="Add" />
      </form>
    </div>
  )
}

export default AddPost
