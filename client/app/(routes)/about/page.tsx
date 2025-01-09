"use client"
import IconInfo from '@/components/IconInfo'
import { Card, CardContent } from '@/components/ui/card'
import { aboutTexts, aboutIcons, aboutUser, aboutInfo } from '@/models/models'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function About() {
  const pathname = usePathname()
  const path = pathname.split('/')


  return (
    <div className="flex flex-col overflow-hidden  items-center justify-center w-full h-full" id="about">
      <div className='uppercase m-20 flex items-start w-full px-20'>
        <span className='text-gray-400 font-medium'>HOME / <span className='text-black font-bold '> {path}</span></span>
      </div>

      <div className="grid lg:grid-cols-12 gap-5">
        <div className="col-span-6 px-20 py-20">
          <h5 className="text-4xl font-bold">
            Our Story
          </h5>
          <div className="mt-12 flex flex-col gap-y-5">
            {
              aboutTexts.map((item) => (
                <p className='text-[16px] text-pretty leading-[30px]'>{item}</p>
              ))
            }
          </div>

        </div>
        <div className="col-span-6">
          <Image src="/about/about_01.jpg" className='object-cover  w-full min-h-[60vh]' alt="" width={892} height={504} />
        </div>
      </div>

      <div className="mt-20 flex lg:flex-row  px-10 flex-col  items-center  justify-between p-20  w-full">
        {
          aboutIcons.map((item) => (
            <Card className=' cursor-pointer rounded-sm sm:py-5 py-10 drop-shadow-md [&>div>span]:hover:text-white group text-black hover:bg-red-600 duration-400 transition-colors sm:min-w-[50vh] md:min-w-[100vh] lg:min-w-[50vh] min-w-[40vh]  mt-10'>
              <div className="flex flex-col items-center justify-center gap-y-3">
                <div className='size-[80px] rounded-full bg-gray-300 group-hover:bg-red-300 flex items-center justify-center'>
                  <div className='size-[60px] rounded-full bg-black flex items-center justify-center'>
                    <Icon icon={item.icon} className=' text-white z-5' width="40" height="40" />
                  </div>
                </div>

                <span className='font-bold text-2xl'>{item.num}</span>
                <span className='text-sm'>{item.name}</span>
              </div>

            </Card>
          ))
        }
      </div>

      <div className="mt-20 flex lg:flex-row md:flex-wrap flex-col gap-y-20 gap-x-4  items-center justify-between sm:min-w-[60vh] min-w-[10vh] ">
        {
          aboutUser.map((item, index) => (
            <div className="flex flex-col items-start">
              <Image
                src={item.image}
                alt='product'
                width={300}
                height={300}
                className='object-cover'
              />
              <span className="text-2xl font-bold mt-3 mb-2">
                {item.name}
              </span>
              <p className='text-sm'>{item.carge}</p>
              <div className="flex items-center gap-x-3 mt-5">
                <Icon icon="ri:twitter-x-fill" width="20" height="20" />
                <Icon icon="meteor-icons:instagram" width="20" height="20" />
                <Icon icon="flowbite:linkedin-solid" width="20" height="20" />
              </div>
            </div>
          ))
        }
      </div>

      <div className="flex md:flex-row flex-col p-10 text-center  gap-x-10 gap-y-14 items-center justify-evenly  mt-48">
        {
          aboutInfo.map((item) => (
            <div className="flex flex-col items-center gap-y-2">
              <div className='size-[80px] rounded-full bg-gray-300 group-hover:bg-red-300 flex items-center justify-center'>
                <div className='size-[60px] rounded-full bg-black flex items-center justify-center'>
                  <Icon icon={item.icon} className=' text-white z-5' width="40" height="40" />
                </div>
              </div>
              <span className='font-medium mt-3 mb-3'>FREE AND FAST DELIVERY</span>
              <p className='text-sm'>Free delivery for all orders over $140</p>
            </div>
          ))
        }



      </div>
    </div>
  )
}

