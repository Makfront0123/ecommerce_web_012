import React from 'react'
import { Card } from './ui/card'
import { Icon } from '@iconify/react'

type props = {
    model: Array<Record<string, any>>;
}

const IconInfo = ({ model }: props) => {
    return (
        <div className="mt-20 flex items-center justify-between p-20 w-full">
            {
                model.map((item: any) => (
                    <Card key={item} className='cursor-pointer rounded-sm drop-shadow-md [&>div>span]:hover:text-white group text-black hover:bg-red-600 duration-400 transition-colors bg-none border-2 flex items-center justify-center border-gray-300 px-10 py-7 mt-10'>
                        <div className="flex flex-col items-center justify-center gap-y-3">

                            {
                                Object.keys(item).map((key: string) => {
                                    return (
                                        <div className='size-[80px] rounded-full bg-gray-300 group-hover:bg-red-300 flex items-center justify-center'>
                                            <div className='size-[60px] rounded-full bg-black flex items-center justify-center'>
                                                <Icon icon={item} className=' text-white z-5' width="40" height="40" />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <span className='font-bold text-2xl'>{item}</span>
                            <span className='text-sm'>{item}</span>
                        </div>
                    </Card>
                ))
            }
        </div>
    )
}

export default IconInfo