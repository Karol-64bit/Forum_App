"use client"

import { signOut } from 'next-auth/react'
import React from 'react'
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();
    const logoutHandler = () => {
        signOut(
            {
                callbackUrl: '/' 
             }
        );
        
    }

  return (
    <div>
      <button onClick={logoutHandler} >Wyloguj</button>
    </div>
  )
}

export default LogoutButton
