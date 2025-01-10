"use client"
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'
const Error = () => {
    const pathname = usePathname()
    const path = pathname.split('/')
    const router = useRouter()
    return (
        <div className='max-w-[185vh] flex flex-col items-start justify-start mx-auto min-h-[40vh] pt-10 '>
            <div className='uppercase flex'>
                <span className='text-gray-400 font-medium'>HOME / <span className='text-black font-bold '> {path}</span></span>
            </div>
            <div className="flex flex-col mx-auto items-center justify-center mt-28">
                <h5 className='text-8xl font-extrabold mb-8'>404 NOT FOUND</h5>
                <p>Your visited page not found. You may go home page.</p>
                <button
                    onClick={() => {
                        router.push('/')
                    }}
                    className='mt-10 px-10 font-semibold py-4 rounded-md bg-red-600 text-white hover:bg-blue-500 duration-500 transition-colors'>
                    Back to the home page
                </button>
            </div>
        </div>
    )
}

export default Error