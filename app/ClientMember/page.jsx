"use client"

import { useSession } from 'next-auth/react'
import React, {useState} from 'react'
import { redirect } from 'next/navigation'
import RegisterForm from '../(components)/RegisterForm'
import AddSection from '../(components)/AddSection'

const Member = () => {
  return (
    <div>
      <AddSection />
    </div>
  )
}

export default Member
