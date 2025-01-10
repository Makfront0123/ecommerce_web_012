"use client"
import { useGlobalContext } from '@/context/globalContext'
import { usePathname } from 'next/navigation'
import { Icon } from '@iconify/react'
import React from 'react'

interface props {
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
    <div className="flex flex-col  w-full p-20" id='contact'>
      <div className=' flex items-center justify-between w-full'>
        <div className='uppercase'>
          <span className='text-gray-400 font-medium'>HOME / <span className='text-black font-bold '> {path}</span></span>
        </div>
        <div className='uppercase font-bold gap-x-[1.8px] flex'>
          <span className='text-black'>Hola</span>,<span className='text-red-600'>{name}!</span>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-20 gap-x-10 w-full h-full" id='contact'>
        <div className="col-span-3 bg-white border-2 border-gray-200 drop-shadow-md px-10">
          <ContactInfo />
        </div>
        <div className='col-span-9 bg-white flex flex-col shadow-lg max-w-[90%] border-2 border-gray-200 max-h-[68vh] rounded-[10px] p-12 gap-y-10'>
          <form action="">
            <div className="grid md:grid-rows-2 sm:grid-cols-1  gap-y-10 gap-x-4 ">
              <div className="flex md:flex-wrap lg:flex-row flex-col justify-between items-center gap-4">
                <div className=" flex  gap-x-5 items-start">
                  <input
                    name='name'
                    type="text"
                    className='focus:border-red-600  duration-400 transition-colors border-b-2 border-gray-200 outline-none p-2 md:min-w-[20vh]  min-w-[2vh]' placeholder='Your Name' />
                  <input
                    name='email'
                    type="email"
                    className='focus:border-red-600  duration-400 transition-colors border-b-2 border-gray-200 outline-none p-2 md:min-w-[20vh]  min-w-[2vh]' placeholder='Your Email' />
                  <input
                    name='phone'
                    type="text"
                    className='focus:border-red-600  duration-400 transition-colors border-b-2 border-gray-200 outline-none p-2 md:min-w-[20vh]  min-w-[2vh]' placeholder='Your Phone' />
                </div>

                <textarea name="" id="" placeholder='Your Message' className='focus:border-red-600  duration-400 transition-colors border-b-2 border-gray-200 outline-none p-2 md:min-w-[109vh] min-h-[30vh]'></textarea>

                <div className="flex mx-auto items-center gap-x-4">
                  <button
                    className='mt-12 px-10 font-semibold py-4 rounded-md text-black hover:bg-blue-500 duration-500 transition-colors'
                  >Cancel</button>
                  <button
                    className='mt-12 px-10 font-semibold py-4 rounded-md bg-red-600 text-white hover:bg-blue-500 duration-500 transition-colors'
                  >Save Changes</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export const ContactInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-10 mt-10">
      {
        contactData.map((item,index) => (
          <ContactItem key={index} id={item.id} icon={item.icon} title={item.title} desc={item.desc} phone={item.phone} />
        ))
      }
      
    </div>
  )
}



export const ContactItem = ({ id, title, desc, phone, icon }: props) => {
  return (
    <div className='flex flex-col gap-y-6' key={id}>
      <div className="flex items-center gap-x-4">
        <div className="px-1 py-1 bg-red-600 rounded-full">
          <Icon icon={icon} className='text-white p-1' width="30" height="30" />
        </div>
        <span className='text-black font-bold '>{title}</span>

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