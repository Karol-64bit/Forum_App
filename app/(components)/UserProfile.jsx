"use client"
import React, {useState} from 'react'
import UserDetails from '../(components)/UserDetails'
import UserAccountSettings from './UserAccountSettings'

const UserProfile = ({userData, postCounter}) => {

  const [editMode, setEditMode] = useState("avatar")

  return (
    <div className='w-7/12 mx-auto'>
        <UserDetails userData={userData} editMode={setEditMode} postCounter={postCounter}/>
        {userData.role == "user" || userData.role == "moderator" || userData.role == "admin"? <UserAccountSettings editMode={editMode} userData={userData}/> : ""}
    </div>
  )
}

export default UserProfile
