"use client"
import React from 'react'
import Image from 'next/image'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserDetails = ({userData, editMode, postCounter}) => {

    const formatUserRole = (role) => {
        switch (role) {
            case "admin": return "Administrator";
            case "user": return "Zwykły użytkownik";
            case "moderator": return "Moderator";
            case "GitHub User": return "Użytkownik GitHub";
            case "Google User": return "Użytkownik Google"
        }
    }

    const formatTimestamp = (timestamp) =>{
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
    
        const date = new Date(timestamp)
        const formattedDate = date.toLocaleString("pl-PL", options);
    
        return formattedDate;
    }

    const canEdit = () => {
        switch (userData.role) {
            case "GitHub User": return false;
            case "Google User": return false;
            default: return true;
        }
    }


    return (
        <div >
            <div className="flex flex-col lg:grid lg:gap-4 2xl:gap-6 lg:grid-cols-3  2xl:pb-8 ml-2 pt-4 ">
                <div className="bg-white lg:order-1 lg:col-span-1 rounded-lg shadow-md border mb-5 p-5 lg:mb-0">
                    <Image src={userData.avatar} alt="test" width={200} height={200} className='rounded-full mx-auto'/>
                    {canEdit() ? <button onClick={()=>{editMode("avatar")}}><FontAwesomeIcon icon={faPenToSquare} className='w-5 h-5' /></button> : ""}
                </div>
                <div className="bg-white lg:order-2 lg:col-span-2 rounded-lg shadow-md border pb-4 mb-5 p-5 lg:mb-0">
                    <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                            <tbody>
                                <tr className="">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">Nazwa użytkownika:</td>
                                <td className="whitespace-nowrap px-6 py-4">{userData.name}</td>
                                <td className="whitespace-nowrap px-6 py-4" >
                                {canEdit() ? <button onClick={()=>{editMode("name")}}><FontAwesomeIcon icon={faPenToSquare} className='w-5 h-5' /></button> : ""}
                                </td>
                                </tr>
                                <tr className="">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">Adres email:</td>
                                <td className="whitespace-nowrap px-6 py-4">{userData.email}</td>
                                <td className="whitespace-nowrap px-6 py-4">
                                {canEdit() ? <button onClick={()=>{editMode("email")}}><FontAwesomeIcon icon={faPenToSquare} className='w-5 h-5' /></button> : ""}
                                </td>
                                </tr>

                                {canEdit() ?
                                        <tr className="">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">Utworzenie konta</td>
                                        <td className="whitespace-nowrap px-6 py-4">{formatTimestamp(userData.createdAt)}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                        </td>
                                        </tr> : ""}

                                <tr className="">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">Rodzaj konta</td>
                                <td className="whitespace-nowrap px-6 py-4">{formatUserRole(userData.role)}</td>
                                <td className="whitespace-nowrap px-6 py-4">
                                </td>
                                </tr>
                                <tr className="">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">Liczba dodanych postów</td>
                                <td className="whitespace-nowrap px-6 py-4">{postCounter}</td>
                                <td className="whitespace-nowrap px-6 py-4">
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails
