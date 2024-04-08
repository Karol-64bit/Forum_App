"use client"
import React, {useState} from 'react'
import Image from 'next/image'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostCard = ({postData, userRole}) => {

  const [editMode, setEditMode] = useState(false)
  const [newContent, setNewContent] = useState("")

  const handleDelete = async () => {
    const res = await fetch(`/api/Post/${postData._id}`, {
      method: "DELETE",
      "Content-type": "application/json",
    });
    console.log(res);
    setEditMode(false);

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
      hour: "2-digit",
      minute: "2-digit",

      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }

    const date = new Date(timestamp)
    const formattedDate = date.toLocaleString("pl-PL", options);

    return formattedDate;
  }

  return (
    <div class="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-2 max-w-md md:max-w-4xl ">
      <div class="w-full flex items-center px-4 py-6">
          <Image src={postData.userAvatarUrl} alt="test" width={100} height={100} className='w-12 h-12 rounded-full object-cover mr-4 shadow'/>
          <div class="w-full ">
            <div class="flex  items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900 -mt-1">{postData.userName} </h2>
                <small class="text-sm text-gray-700 right-0">{formatTimestamp(postData.createdAt)}</small>
            </div>
            <p class="mt-3 text-gray-700 text-sm">
                {postData.content}
            </p>
            {userRole=="admin" || userRole=="moderator" ? 
            <div className='w-full flex justify-end'>
              <button className='mx-5' onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan}className="w-5 h-5"/></button>
              <button className='mx-5' onClick={()=>{setEditMode(!editMode)}}><FontAwesomeIcon icon={faPenToSquare}className="w-5 h-5"/></button>
            </div>
            : ""
            }
            {editMode ?
              <div>
                <label>Nowa treść:</label>
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

export default PostCard
