"use client"

import { useGlobalContext } from '@/context/globalContext'
import { usePathname } from 'next/navigation'
import { Icon } from '@iconify/react'
import React from 'react'

interface Props {
  id: number;
  title: string;
  desc: string;
  phone: string;
  icon: string;
}

export default function Contact() {
  const pathname = usePathname()
  const path = pathname.split('/')
  const { userProfile } = useGlobalContext()
  const { name } = userProfile || {}

  return (
    <div className="flex flex-col w-full md:min-h-[100vh] min-h-[200vh] md:p-20 p-10" id='contact'>
      <div className='flex items-center justify-between w-full'>
        <div className='uppercase'>
          <span className='text-gray-400 font-medium'>HOME / <span className='text-black font-bold'> {path}</span></span>
        </div>
        <div className='uppercase font-bold gap-x-[1.8px] flex'>
          <span className='text-black'>Hola</span>,<span className='text-red-600'>{name}!</span>
        </div>
      </div>
      <div className="grid lg:grid-cols-12 gap-y-10 mx-auto items-center justify-center grid-cols-1 mt-20 md:gap-x-10 gap-x-0 w-full h-full" id='contact'>
        <div className="lg:col-span-3 p-10 bg-white border-2 border-gray-200 drop-shadow-md rounded-lg">
          <ContactInfo />
        </div>
        <div className='lg:col-span-9 overflow-hidden  sm:mt-0 mt-10 bg-white flex flex-col shadow-lg   border-2 border-gray-200 md:max-h-[73vh] max-h-[80]  rounded-[10px] p-12 gap-y-10'>
          <form action="" >
            <div className="flex md:flex-row flex-col mx-auto justify-center items-center  gap-y-10 gap-x-4 ">
              <div className="flex  md:flex-wrap lg:flex-row flex-col justify-center  items-center gap-4">
                <div className=" flex lg:flex-row flex-col gap-y-5 gap-x-5 items-start [&>input]:max-w-[28vh]">
                  <input
                    name='name'
                    type="text"
                    className='focus:border-red-600 duration-400 transition-colors border-b-2 border-gray-200 outline-none p-2' placeholder='Your Name' />
                  <input
                    name='email'
                    type="email"
                    className='focus:border-red-600 duration-400 transition-colors border-b-2 border-gray-200 outline-none p-2 ' placeholder='Your Email' />
                  <input
                    name='phone'
                    type="text"
                    className='focus:border-red-600 duration-400 transition-colors border-b-2 border-gray-200 outline-none p-2' placeholder='Your Phone' />
                </div>

                <textarea name="" id="" placeholder='Your Message' className='focus:border-red-600 duration-400 transition-colors border-b-2 border-gray-200 outline-none p-2 md:min-w-[20vh] lg:min-w-[90vh] min-h-[30vh]'></textarea>

                <div className="flex md:flex-row  flex-col mx-auto items-center gap-x-4">
                  <button className='mt-12 px-10 font-semibold py-4 rounded-md text-black hover:bg-blue-500 duration-500 transition-colors'>
                    Cancel
                  </button>
                  <button className='mt-12 px-10 font-semibold py-4 rounded-md bg-red-600 text-white hover:bg-blue-500 duration-500 transition-colors'>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const ContactInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-10 mt-10">
      {contactData.map((item, index) => (
        <ContactItem key={index} id={item.id} icon={item.icon} title={item.title} desc={item.desc} phone={item.phone} />
      ))}
    </div>
  )
}

const ContactItem = ({ id, title, desc, phone, icon }: Props) => {
  return (
    <div className='flex flex-col gap-y-6' key={id}>
      <div className="flex items-center gap-x-4">
        <div className="px-1 py-1 bg-red-600 rounded-full">
          <Icon icon={icon} className='text-white p-1' width="30" height="30" />
        </div>
        <span className='text-black font-bold'>{title}</span>
      </div>
      <span className='text-sm text-pretty'>{desc}</span>
      <p>{phone}</p>
    </div>
  )
}

const contactData = [
  {
    id: 1,
    icon: 'ic:baseline-phone',
    title: 'Call to Us',
    desc: 'We are available 24/7 to answer all your questions.',
    phone: '+55 55 555 5555'
  },
  {
    id: 213,
    icon: 'bitcoin-icons:message-filled',
    title: 'Write to Us',
    desc: 'Fill out form below to send us a message.',
    phone: 'ingsistemas@gmail.com'
  },
]
