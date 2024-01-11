

import AddThread from '@/app/(components)/AddThread';
import ThreadsBySection from '@/app/(components)/ThreadsBySection';
import React from 'react'


const SectionPage = ({params}) => {

    return (
        <div>
          <h1>tutaj będą wątki z danej sekcji oraz dodawanie dowych wątków</h1>
          <ThreadsBySection sectionId={params.id}/>
          <AddThread sectionId={params.id}/>
        </div>
    )
}

export default SectionPage