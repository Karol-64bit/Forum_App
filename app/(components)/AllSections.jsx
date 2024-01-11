import React from 'react'
import Section from './Section';
import Link from 'next/link'

const getSections = async () =>{
    try{
        const res = await fetch("http://localhost:3000/api/Section", {
          type: 'GET', // ?
          cache: "no-store"
        })
        return res.json();
      }catch(error){
        console.error("failed to get tickets", error);
      }
}

const AllSections = async () => {

    const { sections } = await getSections();

  return (
    <div>
      {sections?.map(section =>(
        <div key={section._id}>
            <Link href={`/SectionPage/${section._id}`}>
                <Section section={section} />
            </Link>
            {section.title}
        </div>
      ))}
    </div>
  )
}

export default AllSections
