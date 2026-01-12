'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UseCart } from '@/hooks/useCart';
import { UseFavorite } from '@/hooks/useFavorite';
import { useGlobalContext } from '@/context/globalContext';
import { SkeletonCard } from '@/app/(routes)/product/components/SkeletonProduct';
 

interface CardUtilProps {
  product: ProductType;
  setSearchLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardSearchProduct: React.FC<CardUtilProps> = ({ product, setSearchLoad }) => {
  const { addItem } = UseCart();
  const { addFavorite, removeFavorite, itemsFavorite } = UseFavorite();
  const [isFavorite, setIsFavorite] = useState(
    itemsFavorite.some(item => item._id === product?._id)
  );
  const router = useRouter();
  const { isAuthenticated } = useGlobalContext();

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      handleLinkClick('/login');
      return;
    }

    if (isFavorite) removeFavorite(product._id);
    else addFavorite(product);
    setIsFavorite(!isFavorite);
  };

  const handleLinkClick = (href: string) => {
    setSearchLoad(true);
    setTimeout(() => {
      router.push(href);
      setSearchLoad(false);
    }, 2000);
  };

  if (!product) return <div className="mt-10"><SkeletonCard /></div>;

  const shortDescription = product.description?.slice(0, 100) || '';
  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <div className="flex flex-col px-4 py-4">
      <Card className="relative sm:max-w-[20rem] overflow-hidden md:max-w-[100%] lg:max-w-[100%] max-w-[50rem] border-none group flex md:flex-row flex-col gap-x-5">
        {/* Imagen */}
        <div className="relative max-w-[20rem] max-h-[24rem]">
          {product.flashSale && product.discount > 0 && (
            <div className="absolute -top-1 -left-2 py-1 px-4 rounded-lg bg-red-600 m-5 z-20">
              <span className="text-white font-bold">-{product.discount}%</span>
            </div>
          )}

          <Image
            src={product.image}
            alt={product.name}
            className="bg-gray-600 object-cover w-full rounded-md p-4"
            width={200}
            height={200}
          />
        </div>

        {/* Detalles */}
        <div className="mt-2 px-5 flex-1">
          <span className="font-bold text-lg">{product.name}</span>
          <p className="text-xs mt-1">{shortDescription}</p>

          <div className="flex mt-3 gap-x-3 items-center">
            <span className="font-bold text-red-600">${discountedPrice.toFixed(2)}</span>
            {product.flashSale && product.discount > 0 && (
              <s className="font-bold text-gray-500">${product.price.toFixed(2)}</s>
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="absolute top-2 right-3 flex flex-col gap-y-4 z-20">
          <Button
            className="px-1 py-1 rounded-full bg-white drop-shadow-md text-black"
            onClick={handleFavoriteClick}
          >
            <Icon
              icon={isFavorite ? 'material-symbols:favorite-rounded' : 'material-symbols:favorite-outline-rounded'}
              className={isFavorite ? 'text-red-600' : 'text-gray-400'}
              width="24"
              height="24"
            />
          </Button>

          <Button
            onClick={() => {
              if (isAuthenticated) router.push(`/product/${product._id}`);
              else handleLinkClick('/login');
            }}
            className="px-1 py-1 rounded-full bg-white drop-shadow-md text-black"
          >
            <Icon icon="ic:baseline-remove-red-eye" width="24" height="24" />
          </Button>
        </div>

        {/* Add to Cart */}
        <CardContent
          onClick={() => {
            if (isAuthenticated) addItem(product);
            else handleLinkClick('/login');
          }}
          className="group-hover:flex group-hover:animate-slide-out-top hidden cursor-pointer absolute bottom-0 hover:bg-gray-400 bg-black w-full hover:opacity-70 duration-400 transition-all items-center justify-center p-3 text-center text-white"
        >
          Add To Cart
        </CardContent>
      </Card>
    </div>
  );
};
