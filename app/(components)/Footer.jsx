import React from 'react'
import Settings from '@/app/(models)/Settings'


const Description = async () => {

    const settings = await Settings.findOne();


    return (
        <div className='flex my-8 justify-center'>  
            <div className="rounded-xl border p-5 shadow-md w-7/12 bg-white">
                {settings.footerText}
            </div>
        </div>
    )
}

export default Description