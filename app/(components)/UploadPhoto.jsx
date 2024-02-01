'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { getSignature, saveToDatabase } from '../_actions'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Dropzone = ({ className, type, owner }) => {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        // If allowing multiple files
        // ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000,
    maxFiles: 1,
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }

  async function action() {
    const file = files[0]
    if (!file) return

    // get a signature using server action
    const { timestamp, signature } = await getSignature()

    // upload to cloudinary using the signature
    const formData = new FormData()

    formData.append('file', file)
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
    formData.append('signature', signature)
    formData.append('timestamp', timestamp)
    formData.append('folder', 'next')

    const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
    const data = await fetch(endpoint, {
      method: 'POST',
      body: formData
    }).then(res => res.json())

    // write to database using server actions
    const id = await saveToDatabase({
      version: data?.version,
      signature: data?.signature,
      public_id: data?.public_id
    })
    console.log(id)

    if(type=="userAvatar"){
      
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME
      const url = `https://res.cloudinary.com/${cloudName}/${id}`
      owner.avatarUrl = url;

      console.log("owener client side",owner)
      const res = await fetch(`/api/Users/${owner.id}`,{
        method: "PUT",
        body: JSON.stringify(owner),
        "Content-type": "application/json",
      });
      console.log(res);
      if(!res.ok){
          throw new Error("Failed to upload image.");
      }
    }
    if(type=="logoImage"){
      
    }
  }

  return (
    <form action={action}>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps({ name: 'file' })} />
        <div className='flex flex-col items-center justify-center gap-4 m-10'>
          <FontAwesomeIcon icon={faCloudArrowUp} className='w-5 h-5 fill-current' />
          {isDragActive ? (
            <p>Upuść plik tutaj ...</p>
          ) : (
            <p>Przeciągnij plik i upuśc go tutaj, lub kliknij aby go wybrać.</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className='mt-10'>
        <div className='flex gap-4'>
          <h2 className='title text-3xl font-semibold'>Preview</h2>
          <button
            type='button'
            onClick={removeAll}
            className='mt-1 rounded-md border border-rose-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white'
          >
            Remove all files
          </button>
          <button
            type='submit'
            className='ml-auto mt-1 rounded-md border border-purple-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-purple-400 hover:text-white'
          >
            Upload to Cloudinary
          </button>
        </div>

        {/* Accepted files */}
        <h3 className='title mt-10 border-b pb-3 text-lg font-semibold text-stone-600'>
          Accepted Files
        </h3>
        <ul className='mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {files.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full rounded-md object-contain'
              />
              <button
                type='button'
                className='absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white'
                onClick={() => removeFile(file.name)}
              >
                
              </button>
              <p className='mt-2 text-[12px] font-medium text-stone-500'>
                {file.name}
              </p>
            </li>
          ))}
        </ul>

      </section>
    </form>
  )
}

export default Dropzone