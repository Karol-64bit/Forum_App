"use client"

import { useSession } from 'next-auth/react'
import React, {useState} from 'react'
import { redirect } from 'next/navigation'

const AddThread = ({sectionId}) => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember")
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
    if(!res.ok){
        throw new Error("Failed to create new Thread.");
    }
  }


  const [formData, setFormData] = useState({
    userId: session?.user?.id,
    userName: session?.user?.name,
    title: '',
    question: '',
    section: sectionId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData,userId: session?.user?.id,userName: session?.user?.name, [name]: value }));
  };

  return (
    <div>
      <h1>Add new Thread</h1>
      <form method="post" onSubmit={handleAddSection}>
        <label>Title</label>
        <input id="title" type='text' name="title" onChange={handleChange} value={formData.title}/>
        <label>Question</label>
        <input id="question" type='text' name="question" onChange={handleChange} value={formData.question}/>
        <input type='submit' name="submit" value="Add" />
      </form>
    </div>
  )
}

export default AddThread
