'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UseCart } from '@/hooks/useCart';
import { UseFavorite } from '@/hooks/useFavorite';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useState } from 'react';
import { useProductContext } from '@/context/productContext';
import { useCategoryContext } from '@/context/categoryContext';
import { useGlobalContext } from '@/context/globalContext';
import DialogLoading from '@/components/DialogLoading';

const DetailsProduct = () => {
  const { product } = useProductContext();
  const { categoryById } = useCategoryContext();
  const { name: categoryName } = categoryById;
  const { addFavorite, removeFavorite, itemsFavorite } = UseFavorite();
  const { addItem } = UseCart();
  const { isAuthenticated } = useGlobalContext();

  const [isFavorite, setIsFavorite] = useState(
    itemsFavorite.some((item) => item._id === product?._id)
  );
  const [loading, setLoading] = useState(false);

  if (!product) return <div>Cargando producto...</div>;

  const discountedPrice = product.price * (1 - product.discount / 100);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) return alert('Debes iniciar sesión');
    if (isFavorite) removeFavorite(product._id);
    else addFavorite(product);
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) return alert('Debes iniciar sesión');
    setLoading(true);
    setTimeout(() => {
      addItem(product);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="p-20 flex flex-col items-start justify-start relative">
      <div className="uppercase text-sm">
        <span className="text-gray-400 font-medium">
          HOME / <span className="text-black font-bold">{categoryName}</span> /{' '}
          <span className="text-black font-bold">{product.name}</span>
        </span>
      </div>

      <div className="grid md:grid-cols-12 min-h-[80vh] w-full h-full gap-5 mt-10">
        <div className="col-span-6 bg-gray-100 flex items-center justify-center rounded-lg shadow-lg relative h-[60vh] md:h-[70vh]">
          {product.flashSale && product.discount > 0 && (
            <div className="absolute top-4 left-4 z-20 bg-red-600 text-white font-bold px-3 py-1 rounded">
              -{product.discount}%
            </div>
          )}
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              priority
            />
          ) : (
            <div>Imagen no disponible</div>
          )}
        </div>
        <div className="bg-white col-span-6 flex flex-col relative">
          <h1 className="text-3xl font-bold mb-5">{product.name}</h1>

          <div className="flex gap-x-3 items-center text-2xl mb-5">
            <span className="font-bold text-red-600">${discountedPrice.toFixed(2)}</span>
            {product.flashSale && product.discount > 0 && (
              <s className="font-bold text-gray-500">${product.price.toFixed(2)}</s>
            )}
          </div>

          <p className="text-sm text-pretty leading-[35px] mt-4">
            {product.description?.slice(0, 300)}
          </p>

          <Separator className="my-4" />

          <div className="flex gap-6 mt-10">
            <Button
              variant="destructive"
              className="py-5 w-full"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <Button
              onClick={handleFavoriteClick}
              className="bg-white px-4 py-5 flex items-center justify-center"
            >
              <Icon
                icon={isFavorite ? 'material-symbols:favorite-rounded' : 'material-symbols:favorite-outline-rounded'}
                className={isFavorite ? 'text-red-600' : 'text-gray-400'}
                width="24"
                height="24"
              />
            </Button>
          </div>
        </div>
      </div>

      {loading && <DialogLoading />}
    </div>
  );
};

export default DetailsProduct;
