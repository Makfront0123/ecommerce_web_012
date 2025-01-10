import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import React from 'react'

const FeatureContent = () => {
    return (
        <div className=' flex flex-col w-full sm:min-h-[100vh] min-h-[130vh]'>
            <div className="flex sm:items-start  items-center gap-20">
                    <h2 className=' text-3xl font-semibold'>New Arrival</h2>

                </div>
            <FeatureContentCard />
        </div>
    )
}

export default FeatureContent

const FeatureContentCard = () => {
    return (
        <div className="grid lg:grid-cols-12 sm:grid-cols-1 sm:[&>div]:max-h-[80vh] [&>div]:max-h-[90vh] gap-y-6 sm:px-2 px-5 gap-x-10 mt-14">
            <div className="relative col-span-6 rounded-md shadow-md ">
                <div className="absolute bottom-10 left-10 flex flex-col items-start text-white">
                    <strong className='text-2xl mb-3'>PlayStation 6</strong>
                    <p>Black an White version of the PlayStation 6 console</p>
                    <Button
                        className="mt-5 px-10 py-3 rounded-md bg-red-600 text-white hover:bg-blue-500 duration-500 transition-colors">
                        Buy Now
                    </Button>
                </div>
                <Image src='/arrival/Frame 684.png' className='h-full w-full object-cover' alt="" height={800} width={1200} />

            </div>
            <div className="grid grid-rows-2 col-span-6 gap-y-10 ">
                <div className='relative  rounded-md shadow-md '>
                    <div className="absolute bottom-10 left-10 flex flex-col items-start text-white">
                        <strong className='text-2xl mb-3'>PlayStation 6</strong>
                        <p>Black an White version of the PlayStation 6 console</p>
                        <Button
                            className="mt-5 px-10 py-3 rounded-md bg-red-600 text-white hover:bg-blue-500 duration-500 transition-colors">
                            Buy Now
                        </Button>
                    </div>
                    <Image src='/arrival/Frame 684.png' className='h-full w-full object-cover' alt="" height={800} width={1200} />
                </div>
                <div className='grid md:grid-cols-2 grid-cols-1 sm:gap-y-0 gap-y-8 gap-x-10'>
                    <div className='relative rounded-md shadow-md h-full '>
                        <div className="absolute bottom-10 md:left-10 left-0 flex flex-col items-start text-white">
                            <strong className='text-2xl mb-3'>PlayStation 6</strong>
                            <p>Black an White version of the PlayStation 6 console</p>
                            <Button
                                className="mt-5 px-10 py-3 rounded-md bg-red-600 text-white hover:bg-blue-500 duration-500 transition-colors">
                                Buy Now
                            </Button>
                        </div>

                        <div className="h-full relative max-h-[37vh]">
                            <div className="absolute bottom-10 md:left-10 left-5 flex flex-col items-start text-white">
                                <strong className='sm:text-2xl text-[18px] mb-3'>PlayStation 5</strong>
                                <p>PlayStation 5 console</p>
                                <Button
                                    className="mt-5 px-10 py-3 rounded-md bg-red-600 text-white hover:bg-blue-500 duration-500 transition-colors">
                                    Buy Now
                                </Button>
                            </div>

                            <Image src="/arrival/Frame 684.png" className='h-full w-full object-cover' alt="" height={800} width={1200} />
                        </div>
                    </div>

                    <div className=' w-full h-full relative rounded-md shadow-md  max-h-[37vh] '>
                        <div className="absolute bottom-10 md:left-10 left-5 flex flex-col items-start text-white">
                            <strong className='sm:text-2xl text-[18px] mb-3'>PlayStation 5</strong>
                            <p>PlayStation 5 console</p>
                            <Button
                                className="mt-5 px-10 py-3 rounded-md bg-red-600 text-white hover:bg-blue-500 duration-500 transition-colors">
                                Buy Now
                            </Button>
                        </div>
                        <Image src='/arrival/Frame 684.png' className='h-full w-full object-cover' alt="" height={800} width={1200} />
                    </div>
                </div>
            </div>
        </div>
    )

}
