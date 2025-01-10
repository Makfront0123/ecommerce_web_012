import { footerAccount, quickLinks, socialIcons } from '@/models/models'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import React from 'react'
import Image from 'next/image'

export const Footer = () => {
    return (
        <footer className="mt-36 min-h-[90vh] overflow-hidden flex flex-col items-center justify-center w-full bg-black text-white ">
            <div className="flex lg:flex-row flex-col gap-y-20 sm:mt-0 mt-20 md:text-left text-center  items-center mx-auto md:p-18 sm:p-10 mb-18 justify-center gap-x-16 min-h-[70vh] border-b-2 border-gray-700 border-opacity-30">
                <div className='flex flex-col gap-y-6'>
                    <h4 className='font-bold  text-2xl'>Exclusive</h4>
                    <span className='font-semibold text-[20px]'>Subscribe</span>
                    <p>Get 10% off your first order</p>
                    <form>
                        <div className="relative sm:flex hidden">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <Icon icon="majesticons:send" width="24" height="24" />
                            </div>
                            <input type="search" id="search" className="block w-full p-3 ps-10 text-sm text-gray-900 border bg-transparent  border-gray-300 rounded-lg" placeholder="Search" required />

                        </div>
                    </form>

                </div>
                <div className='flex flex-col gap-y-7  '>
                    <h4 className='font-bold  text-2xl'>Support</h4>
                    <address className=' text-[20px]'>
                        111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
                    </address>
                    <span className=''>email@example.com</span>
                    <p className='font-bold'>+55 55 555 5555</p>
                </div>
                <div className='flex flex-col gap-y-6 max-w-2xl'>
                    <h4 className='font-bold   text-2xl'>Account</h4>
                    {
                        footerAccount.map((item) => (
                            <Link href={item.href} key={item.id}>
                                {item.title}
                            </Link>
                        ))
                    }
                </div>
                <div className='flex flex-col gap-y-6 max-w-2xl'>
                    <h4 className='font-bold text-2xl'>Quick Link</h4>
                    {
                        quickLinks.map((item) => (
                            <Link href={item.href} key={item.id}>
                                {item.title}
                            </Link>
                        ))
                    }
                </div>
                <div className='flex flex-col gap-y-6 max-w-2xl'>
                    <h4 className='font-bold text-2xl'>Download App</h4>
                    <p className='text-gray-600 font-medium text-sm'>save 3$ with App New User Only</p>
                    <div className="grid grid-cols-2 gap-2">
                        <Image src="/Qr Code.svg" className=' object-fill' width={94} height={94} alt="" />

                        <div className="grid grid-rows-2 gap-3">
                            <Image src="/google-play.svg" className='cursor-pointer hover:scale-105 object-contain  ' width={150} height={150} alt="" />
                            <Image src="/appstore.svg" className='cursor-pointer hover:scale-105 object-contain' width={150} height={150} alt="" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-x-5">
                        {
                            socialIcons.map((item,index) => (
                                <Icon key={index} icon={item.icon} width="24" height="24" />
                            ))
                        }
                    </div>
                </div>
            </div>
            <span className='flex items-center justify-center mt-5 text-gray-500 text-opacity-35'>Armando 2024. All right reserved</span>
        </footer>
    )
}