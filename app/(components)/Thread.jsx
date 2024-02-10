"use client"
import React, {useState} from 'react'
import Image from 'next/image'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const Thread = ({thread, userRole}) => {

  const router = useRouter();
  const [editMode, setEditMode] = useState(false)
  const [newContent, setNewContent] = useState("")

    
  const handleDelete = async () => {
    const res = await fetch(`/api/Thread/${thread._id}`, {
      method: "DELETE",
      "Content-type": "application/json",
    });
    console.log(res);
    setEditMode(false);
    router.push(`/SectionPage/${thread.sectionId}`)
    if (!res.ok) {
      throw new Error("Failed to update data.");
    }
  }

  const handleSubmitEdit = async () => {
    console.log("edit",postData._id)
    console.log("submit",newContent)
    postData.content = newContent
    console.log(postData.content)
    const res = await fetch(`/api/Post/${postData._id}`, {
      method: "PUT",
      body: JSON.stringify(postData),
      "Content-type": "application/json",
    });
    console.log(res);
    setEditMode(false);

    if (!res.ok) {
      throw new Error("Failed to update data.");
    }

  }

  const handleChange = (e) => {
    setNewContent(e.target.value);
  };

  const formatTimestamp = (timestamp) =>{
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      
    }

    const date = new Date(timestamp)
    const formattedDate = date.toLocaleString("pl-PL", options);

    return formattedDate;
  }

  return (
    <div>
      <div className='flex my-8 justify-center'>  
        <div className="rounded-xl border p-5 shadow-md w-7/12 bg-white">
          <div className="flex w-full items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-3">
              <Image src={thread.userAvatarUrl} alt="test" width={100} height={100} className='h-12 w-12 rounded-full'/>
              <div className="text-lg font-bold text-slate-700">{thread.userName}</div>
            </div>
            <div className="flex items-center space-x-8">
              {/* <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">Category</button> */}
              <div className="text-xs text-neutral-500">{formatTimestamp(thread.createdAt)}</div>
            </div>
          </div>
          <div className="mt-4 mb-6">
            <div className="mb-3 text-xl font-bold">{thread.title}</div>
            <div className="text-sm text-neutral-600">{thread.question}</div>
          </div>
          {userRole=="admin" || userRole=="moderator" ? 
            <div className='w-full flex justify-end'>

              <button className='mx-5' onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan}className="w-5 h-5"/></button>
              <button className='mx-5' onClick={()=>{setEditMode(!editMode)}}><FontAwesomeIcon icon={faPenToSquare}className="w-5 h-5"/></button>
            </div>
            : ""
            }
            {editMode ?
              <div>
                <input type="text" value={newContent} onChange={handleChange }/>
                <button onClick={handleSubmitEdit}>Zapisz</button>
              </div>
              :""
            }

        </div>
      </div>
    </div>
  )
}

export default Thread