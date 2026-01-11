"use client"
import { Button } from '@/components/ui/button'
import { UseCart } from '@/hooks/useCart'
import { UseFavorite } from '@/hooks/useFavorite'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Icon } from '@iconify/react'

const Wishlist = () => {
  const { itemsFavorite } = UseFavorite()
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className='uppercase'>
        <span className='text-gray-400 font-medium'>Wishlist ({itemsFavorite.length})</span>
      </div>

      <div className="mt-10">
        {itemsFavorite.length === 0 ? (
          <p className='text-center text-gray-400 text-lg mt-10'>No products found in the wishlist</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {itemsFavorite.map((item) => (
              <CardFavorite key={item._id} products={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist



const CardFavorite = ({ products }: { products: ProductType }) => {
  const perce = products.price * products.discount
  const total = products.price - perce
  const router = useRouter()
  const { addItem } = UseCart()
  const { removeFavorite } = UseFavorite()

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative w-full h-64">
        {products.discount > 0 && (
          <div className="absolute top-2 left-2 py-1 px-3 rounded-lg bg-red-600 z-20">
            <span className='text-white font-bold'>-{products.discount * 100}%</span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
          <Button
            className="rounded-full"
            variant="destructive"
            onClick={() => removeFavorite(products._id)}
          >
            <Icon icon="material-symbols:delete-outline-sharp" width="20" height="20" />
          </Button>

          <Button
            className="rounded-full"
            onClick={() => router.push(`/product/${products._id}`)}
          >
            <Icon icon="ic:baseline-remove-red-eye" width="20" height="20" />
          </Button>
        </div>

        <Image
          src={products.image}
          alt={products.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
        />
        <button
          onClick={() => addItem(products)}
          className="absolute bottom-0 left-0 w-full bg-black text-white py-3 hover:opacity-80 transition-opacity duration-200"
        >
          Add To Cart
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <span className="font-semibold">{products.name}</span>
        <div className="flex items-center gap-2">
          <strong className='text-red-600'>${products.price}</strong>
          {products.discount > 0 && (
            <s className='text-gray-400'>${total.toFixed(2)}</s>
          )}
        </div>
      </div>
    </div>
  )
}
``
