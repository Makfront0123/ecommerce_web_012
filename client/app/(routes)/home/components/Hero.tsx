import { exploreLinks } from '@/models/models'
import React from 'react'
import { CarouselHero } from './CarouselHero'

const Hero = () => {
    return (
        <section className="grid lg:grid-cols-12 grid-cols-1 min-h-[20vh]">
            <div className="md:col-span-3 col-span-12 flex items-center md:justify-start justify-center mx-auto w-full sm:border-r-[1.5px] border-gray-400">
                <ul className="flex items-start p-10 justify-end flex-col gap-y-5">
                    {
                        exploreLinks.map((item) => (
                            <li key={item.id}
                                className="text-black text-[17px] cursor-pointer hover:border-b-2 hover:duration-300 transition-colors
                             hover:border-blue-600 font-semibold hover:opacity-50 duration-200">
                                {item.title}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="col-span-9 p-10">
                <CarouselHero />
            </div>
        </section>
    )
}

export default Hero