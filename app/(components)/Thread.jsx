import React from 'react'

const Thread = ({thread}) => {
    console.log(thread.title)
  return (
    <div>
      <h2>{thread.title}</h2>
      <h3>{thread.question}</h3>
      <hr />
    </div>
  )
}

export default Thread