"use client"

import { useSession } from 'next-auth/react'
import React, {useState} from 'react'
import { redirect } from 'next/navigation'
import RegisterForm from '../(components)/RegisterForm'

const Member = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  )
}

export default Member
