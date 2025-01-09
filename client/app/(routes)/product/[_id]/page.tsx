"use client"
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCategoryContext } from '@/context/categoryContext';
import { useProductContext } from '@/context/productContext';
import { UseCart } from '@/hooks/useCart';
import { UseFavorite } from '@/hooks/useFavorite';
import { Icon } from '@iconify/react'
import Image from 'next/image';
import {  useState } from 'react';

const DetailsProduct = () => {
  const { product } = useProductContext()
  const { addFavorite, removeFavorite, itemsFavorite } = UseFavorite()
  const [isFavorite, setIsFavorite] = useState(itemsFavorite.some((item) => item._id === product?._id));
  const { addItem } = UseCart()
  const [quantity, setQuantity] = useState(1)
  const { categoryById } = useCategoryContext()
  const { name } = categoryById

  const shortDescription = product?.description?.slice(0, 300);


  const handleFavoriteClick = () => {
    if (isFavorite) {

      removeFavorite(product._id);
    } else {

      addFavorite(product);
    }


    setIsFavorite(!isFavorite);
  };



  const handleAddToCart = () => {
    if (product) {
      const productWithQuantity = { ...product, quantity };
      addItem(productWithQuantity);
    }
  };

  return (
    <div className="p-20 flex flex-col items-start justify-start">
      <div className="uppercase text-sm">
        <span className="text-gray-400 font-medium">
          HOME / <span className="text-black font-bold"></span>{name} / <span className="text-black font-bold">{product?.name}</span>
        </span>
      </div>
      <div className="grid md:grid-cols-12 min-h-[80vh] w-full h-full gap-5 mt-10 " >

        <div className="col-span-6  bg-gray-100 flex items-center justify-center rounded-lg  ">

          {product?.image ? (
            <Image src={product.image} className="object-cover size-[50vh]  rounded-lg" alt={product.name} width={300} height={300} />
          ) : (
            <div>Imagen no disponible</div>
          )}
        </div>
        <div className=" bg-white col-span-6 flex flex-col">
          <h6 className='text-3xl font-bold mb-5'>{product?.name}</h6>
          {
            product.flashSale == true ?
              <div className="flex gap-x-3 text-2xl">
                <span className='font-bold text-red-600'>${product.price}</span>
                <s className='font-bold text-gray-500'>${product.price - (product.price * product.discount)}</s>
              </div>
              : <span className='text-2xl font-bold '>${product?.price}</span>
          }

          <p className='text-sm text-pretty leading-[35px] mt-4 '>{shortDescription}</p>
          <Separator className="my-4" />
          <div className="flex gap-10 mr-[32%] items-center justify-start mt-10">
            <Button className="w-full py-5" variant="destructive" onClick={handleAddToCart}>Add to Cart</Button>
            <Button onClick={handleFavoriteClick} className='bg-white'>
              <Icon icon={isFavorite ? 'material-symbols:favorite-rounded' : 'material-symbols:favorite-outline-rounded'}
                className={isFavorite ? 'text-red-600' : 'text-gray-400'}
                width="24" height="24" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

};


export default DetailsProduct;