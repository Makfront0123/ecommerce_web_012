import React from 'react'
import CategoriesCarousel from './CategoriesCarousel'
import { useCategoryContext } from '@/context/categoryContext'
import { Separator } from '../../../../components/ui/separator'
import AnimateOnScroll from '@/components/AnimationOnScroll'

const CategoriesContent = () => {
  const { allCategories } = useCategoryContext()
  return (
    <div className='flex flex-col sm:items-start'>
      <h3 className="font-bold text-3xl mb-3 mt-10 ">
        Browse By Category
      </h3>
      {
        allCategories.length > 0 && <AnimateOnScroll animationClass="opacity-0 translate-x-10 w-full" animateClass="opacity-100 translate-x-0">
          <CategoriesCarousel categories={allCategories} />
        </AnimateOnScroll>
      }
      {
        allCategories.length === 0 && <div className="flex items-center justify-center">

          <h2 className="text-2xl font-semibold text-gray-400 mt-10">No products found</h2>
        </div>
      }

      <Separator className='my-20' />

    </div>
  )
}

export default CategoriesContent