"use client"

import { useSession } from 'next-auth/react'
import React, {useState} from 'react'
import { redirect } from 'next/navigation'

const AddPost = ({threadId}) => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember")
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
    const testId = session?.user?.id
    const testName = session?.user?.name
    const value = e.target.value;
    const updatedFormData = { ...formData, content: value, userId: testId, userName: testName };
    setFormData(updatedFormData);
}

  const startingData = {
    userId: "",
    userName: "",
    content: "",
    threadId: threadId
  }

  const [formData, setFormData] = useState(startingData)

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
