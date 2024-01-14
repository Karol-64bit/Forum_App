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
    <div className="relative flex flex-col items-center justify-center overflow-hidden mt-20">
      <div className="w-full p-6 bg-white rounded-md shadow-md max-w-screen-xl">
        <h1 className="text-3xl font-bold text-left text-gray-700">
          Add new section
        </h1>
        <form method="post" onSubmit={handleAddSection} className="mt-6">
          <div className="flex justify-between">
            <label className="block text-sm font-semibold text-gray-800">
              Title
            </label>
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id="title"
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
            />

            <input className="" type="submit" name="submit" value="Add" />
          </div>

          <label className="">Description</label>
          <input
            className=""
            id="description"
            type="text"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </form>
      </div>
    </div>
  );
}

export default AddSection
