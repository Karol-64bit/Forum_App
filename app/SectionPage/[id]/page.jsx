import AddThread from '@/app/(components)/AddThread';
import ThreadsBySection from '@/app/(components)/ThreadsBySection';
import React from 'react'
import { getServerSession } from 'next-auth'
import { options } from '../../api/auth/[...nextauth]/options'

const SectionPage = async ({params}) => {
  const session = await getServerSession(options)
  console.log("test");
    return (
        <div>
          {session?<AddThread sectionId={params.id}/>: ""}

          <ThreadsBySection sectionId={params.id}/>
        </div>
    )
}

export default SectionPage