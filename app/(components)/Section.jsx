import React from 'react'

const Section = ({section}) => {
  return (
    <div>
      <h2>{section.title}</h2>
      <h3>{section.description}</h3>
      <hr />
    </div>
  )
}

export default Section
