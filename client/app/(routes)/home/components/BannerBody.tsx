import TimerRegression from '@/components/TimerRegression'
import React from 'react'
import Image from 'next/image'
const BannerBody = () => {
    return (
        <div className="relative w-full">
            <Image src="/banner_experience.webp" className='object-cover sm:max-w-7xl w-full sm:min-h-[77vh] md:min-h-[60vh] min-h-[80vh]'  alt="" />
            <div className="absolute sm:bottom-[6%] bottom-[0%]  md:left-[5%]  right-0">
                <TimerRegression
                   
                />
                <button className="mt-10  px-10 py-3 mb-5 sm:ml-0 mr-4 rounded-md bg-[#00FF66] text-white hover:bg-blue-500 duration-500 transition-colors">Buy Now</button>
            </div>
        </div>
    )
}

export default BannerBody