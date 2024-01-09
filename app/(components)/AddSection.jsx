"use client"

import { useSession } from 'next-auth/react'
import React, {useState} from 'react'
import { redirect } from 'next/navigation'

const AddSection = () => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember")
    },
  });

  const handleAddSection = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Section",{
      method: "POST",
      body: JSON.stringify({formData}),
      "Content-type": "application/json",
    });
    console.log(res);
    if(!res.ok){
        throw new Error("Failed to create new section.");
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    
    setFormData((prevState) => ({
        ...prevState,
        [name]:value,
    }));
}

  const startingData = {
    title: "",
    description: "",
    threads: [],
  }

  const [formData, setFormData] = useState(startingData)

  return (
    <div>
      <h1>Add new section</h1>
      <form method="post" onSubmit={handleAddSection}>
        <label>Title</label>
        <input id="title" type='text' name="title" onChange={handleChange} value={formData.title}/>
        <label>Description</label>
        <input id="description" type='text' name="description" onChange={handleChange} value={formData.description}/>
        <input type='submit' name="submit" value="Add" />
      </form>
    </div>
  )
}

export default AddSection
