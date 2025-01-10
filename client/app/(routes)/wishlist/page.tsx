"use client"
import { Button } from '@/components/ui/button'
import { UseCart } from '@/hooks/useCart'
import { UseFavorite } from '@/hooks/useFavorite'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React  from 'react'
import { Icon } from '@iconify/react'

const Wishlist = () => {
  const { itemsFavorite } = UseFavorite()
  return (
    <div className="max-x-4xl py-16 px-20">
      <div className='uppercase'>
        <span className='text-gray-400 font-medium'>Wishlist({itemsFavorite.length})</span>
        <div className="mt-20">
          {
            itemsFavorite.length == 0 ? (
              <p className='text-center'>Not products founds in the wishlist</p>
            )
              :
              <div className="flex flex-wrap gap-x-10 gap-y-5">
                {itemsFavorite.map((item) => (

                  <CardFavorite key={item._id} products={item} />

                ))}
              </div>
          }

        </div>

      </div>
    </div>
  )
}

export default Wishlist


interface CardItemProps {
  products: ProductType
}
export const CardFavorite = (props: CardItemProps) => {
  const { products } = props
  const perce = products.price * products.discount
  const total = products.price - perce
  const router = useRouter()
  const { addItem } = UseCart()
  const {  removeFavorite } = UseFavorite()



  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <div

        className="relative w-[230px] h-[260px] bg-[#F5F5F5] rounded-[10px] flex-shrink-0 m-2"
      >
        <div className="absolute -top-1 -left-2 py-1 px-4 rounded-lg bg-red-600 m-5 z-20">
          <span className='text-white font-bold'>-{products.discount * 100}%</span>
        </div>
        <div className="absolute top-0 right-3 flex flex-col gap-y-4 z-20">

          <Button className="px-3 py-3 mt-3 ml-8 flex mx-auto" variant="destructive" onClick={() => { removeFavorite(products._id) }}>
            <Icon icon="material-symbols:delete-outline-sharp" width="24" height="24" />
          </Button>
          <button onClick={() => router.push(`/product/${products._id}`)} className="px-1 py-1 rounded-full flex items-center justify-center bg-white drop-shadow-md text-black">
            <Icon icon="ic:baseline-remove-red-eye" width="24" height="24" />
          </button>


        </div>
        <div className="relative overflow-hidden h-full">
          <Image src={products.image} alt={products.name} className="w-full  object-fill" width={230} height={60} />
          <div className="absolute top-0 inset-0 bg-black w-full h-full opacity-30"></div>
        </div>

        <button onClick={() => addItem(products)} className="hover:opacity-75 duration-200 transition-all absolute bottom-0 left-0 bg-black py-3 w-full text-white flex items-center justify-center">
          Add To Cart
        </button>
      </div>
      <div className="flex flex-col p-2 mt-3">
        <span className='font-semibold'>{products.name}</span>
        <div className="flex items-center gap-x-4 text-[17px] mb-3">
          <strong className='text-red-600'>${products.price}</strong>
          <s className='font-semibold text-gray-400'>{total}</s>

        </div>
      </div>
    </div>
  )
}


