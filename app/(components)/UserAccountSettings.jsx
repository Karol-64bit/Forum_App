"use client"
import React, {useState} from 'react'
import Dropzone from './UploadPhoto'

const UserAccountSettings = ({editMode, userData}) => {
  
  const [userName, setUserName] = useState("")
  const [userMail, setUserMail] = useState("")

  // console.log(userData)

  const handleEditUserName = async (event) => {
    event.preventDefault();
    userData.name = userName
    const res = await fetch(`/api/Users/${userData.id}`,{
      method: "PUT",
      body: JSON.stringify(userData),
      "Content-type": "application/json",
    });
    console.log(res);
    if(!res.ok){
        throw new Error("Failed to upload image.");
    }
  }

  const handleEditUserMail = async (event) => {
    event.preventDefault();
    userData.email = userMail
    const res = await fetch(`/api/Users/${userData.id}`,{
      method: "PUT",
      body: JSON.stringify(userData),
      "Content-type": "application/json",
    });
    console.log(res);
    if(!res.ok){
        throw new Error("Failed to upload image.");
    }
  }

  return (
    <div className="rounded-xl border p-5 shadow-md bg-white">
      {/* {console.log(editMode)} */}
      {editMode == "avatar" ? (
        <div>
          <Dropzone type="userAvatar" owner={userData} />
        </div>
      ) : (
        ""
      )}
      {editMode == "name" ? (
        <div className="flex justify-center">
          <form
            method="post"
            onSubmit={handleEditUserName}
            className="w-full max-w-5xl bg-white rounded-lg px-4 pt-2"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                Zmiana nazwy użytkownika
              </h2>
              <div className="w-full md:w-full px-3 mb-2 mt-2 flex">
                <input
                  className="bg-white rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  id="name"
                  type="text"
                  name="name"
                  onChange={(e) => {
                    setUserName(e.target.value);
                    console.log(userData)
                  }}
                  value={userName}
                  placeholder="Nowa nazwa"
                />
                <input
                  className="bg-white text-gray-700 font-medium mx-1 p-2 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  type="submit"
                  name="submit"
                  value="Zapisz nową nazwe"
                />
              </div>
            </div>
          </form>
          <button onClick={handleEditUserName}>testowy przycisk</button>
        </div>
      ) : (
        ""
      )}
      {editMode == "email" ? (
        <div className="flex justify-center">
          <form
            method="post"
            onSubmit={handleEditUserMail}
            className="w-full max-w-5xl bg-white rounded-lg px-4 pt-2"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                Zmiana adresu email
              </h2>
              <div className="w-full md:w-full px-3 mb-2 mt-2 flex">
                <input
                  className="bg-white border rounded border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  id="email"
                  type="text"
                  name="email"
                  onChange={(e) => {
                    setUserMail(e.target.value);
                  }}
                  value={userMail}
                  placeholder="Nowy email"
                />
                <input
                  className="bg-white text-gray-700 font-medium mx-1 p-2 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  type="submit"
                  name="submit"
                  value="Zapisz nowy Email"
                />
              </div>
            </div>
          </form>
          
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserAccountSettings
