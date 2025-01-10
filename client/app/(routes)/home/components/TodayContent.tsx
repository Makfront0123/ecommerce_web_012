"use client";
import React from 'react'
import TimerRegression from '../../../../components/TimerRegression'
import CarouselToday from './CarouselToday';
import { useProductContext } from '@/context/productContext';
import { SkeletonCard } from '../../product/components/SkeletonProduct';
import AnimateOnScroll from '@/components/AnimationOnScroll';


const TodayContent = () => {
    const { products, loading } = useProductContext();

    const saleProducts = products.filter((product: ProductType) => product?.flashSale == true);
    return (
        <div className=' flex flex-col items-start w-full min-h-[100vh] border-b-2  border-gray-100'>
            <div className="flex items-start  justify-between  mt-10 gap-x-20">
                <div className="flex sm:flex-row flex-col items-center sm:gap-y-2 gap-y-4  mx-auto sm:gap-x-20 gap-x-2">
                    <h2 className=' text-3xl font-semibold'>Flash Sales</h2>
                    <TimerRegression />
                </div>

            </div>
            <div className="mt-20">
                {
                    loading ? <SkeletonCard />
                        : products.length > 0 ?
                            <AnimateOnScroll animationClass="opacity-0 translate-x-10" animateClass="opacity-100 translate-x-0">
                                <CarouselToday product={saleProducts} />
                            </AnimateOnScroll>
                            : <div className="flex items-center justify-center">

                                <h2 className="text-2xl font-semibold text-gray-400 mt-10">No products found</h2>
                            </div>
                }
            </div>
            <button className='mt-20 mb-20 py-3 px-12 text-white font-medium flex mx-auto  bg-red-600 rounded-md hover:scale-105 duration-200'>View All Products</button>
        </div>
    )
}

export default TodayContent