"use client";
import React, { useState } from "react";
import Image from "next/image";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
// import SettingsProvider from '../(components)/SettingsProvider';

const UsersManage = ({ allUsers }) => {
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("user");
  const [userData, setUserData] = useState({});

  const router = useRouter();

  const roles = [
    { value: "moderator", label: "Moderator" },
    { value: "user", label: "Zwykły użytkownik" },
    { value: "admin", label: "Administrator" },
  ];

  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("pl-PL", options);

    return formattedDate;
  };

  const handleChangeRole = (event) => {
    setUserRole(event.target.value);
    console.log(userName);
  };

  const editUser = (user) => {
    setEditMode(true);
    setUserName(user.name);
    setUserData(user);
    console.log(userData);
  };

  const handleEditUser = async (event) => {
    event.preventDefault();
    userData.name = userName;
    userData.role = userRole;
    console.log(userData);
    const res = await fetch(`/api/Users/${userData._id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      "Content-type": "application/json",
    });
    console.log(res);
    setEditMode(false);
    router.refresh();
    if (!res.ok) {
      throw new Error("Failed to update data.");
    }
  };

  const handleDeleteUser = async (event) => {
    event.preventDefault();
    const res = await fetch(`/api/Users/${userData._id}`, {
      method: "DELETE",
      "Content-type": "application/json",
    });
    console.log(res);
    setEditMode(false);
    router.refresh();
    if (!res.ok) {
      throw new Error("Failed to delete data.");
    }
  };

  const formatUserRole = (role) => {
    switch (role) {
        case "admin": return "Administrator";
        case "user": return "Zwykły użytkownik";
        case "moderator": return "Moderator";
    }
}

  return (
    <div className="w-7/12  mx-auto">
      <div className="flex flex-wrap w-full mb-8">
        <div className="w-full mb-6 lg:mb-0">
          <h1 className="sm:text-4xl text-5xl font-medium title-font mb-2 text-gray-900">
            Zarządzanie użytkownikami
          </h1>
          <div className="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
      </div>

      {editMode ? (
        <div className="bg-white rounded-lg px-4 pt-2">
        <div className="flex justify-center ">
          <form
            method="PUT"
            onSubmit={handleEditUser}
            className="w-full max-w-5xl "
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <h2 className="px-4 pt-3 text-gray-800 text-lg">
                Nazwa użytkownika
              </h2>
              <div className="w-full md:w-full px-3 mt-2 flex">
                <input
                  className="bg-white rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  id="name"
                  type="text"
                  name="name"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  value={userName}
                  placeholder="Nowa nazwa"
                />
                <select value={userRole} onChange={handleChangeRole} className="m-3 bg-white">
                  {roles.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input
                  className="bg-white text-gray-700 font-medium mx-1 p-2 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  type="submit"
                  name="submit"
                  value="Zapisz zmiany"
                />
              </div>
            </div>
          </form>

        </div>
                    <div className="w-full flex justify-end">
                  <button
                    className="bg-white text-gray-700 font-medium border p-2 px-3 border-gray-400 rounded-lg mx-2 mb-3 hover:bg-gray-100"
                    onClick={handleDeleteUser}
                  >
                    Usuń
                  </button>
                  <button
                    className="bg-white text-gray-700 font-medium border p-2 px-3 border-gray-400  rounded-lg mx-2 mb-3  hover:bg-gray-100"
                    onClick={() => {
                      setEditMode(false);
                      setUserName("");
                    }}
                  >
                    Anuluj
                  </button>
                    </div>
          </div>
      ) : (
        ""
      )}

      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Użytkownik
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Rola
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Data utworzenia
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Zarządzaj
            </th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user._id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <Image
                      src={user.avatarUrl}
                      alt="test"
                      width={200}
                      height={200}
                      className="rounded-full mx-auto"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {user.name}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{formatUserRole(user.role)}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {formatTimestamp(user.createdAt)}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full mx-auto"
                  ></span>
                  <span className="relative">
                    <button
                      onClick={() => {
                        editUser(user);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="w-5 h-5"
                      />
                    </button>
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersManage;
