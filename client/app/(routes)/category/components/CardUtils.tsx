import { Card, CardContent, CardFooter } from '../../../../components/ui/card';
import Image from 'next/image';
import { UseCart } from '@/hooks/useCart';
import { Button } from '../../../../components/ui/button';
import { UseFavorite } from '@/hooks/useFavorite';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/globalContext';
export const CardUtil = ({ product }: { product: ProductType }) => {
    const { addItem } = UseCart()
    const { addFavorite, removeFavorite, itemsFavorite } = UseFavorite()
    const [isFavorite, setIsFavorite] = useState(itemsFavorite.some((item) => item._id === product?._id));
    const router = useRouter()
    const { isAuthenticated } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const handleFavoriteClick = () => {
        if (isFavorite) {

            removeFavorite(product._id);
        } else {

            addFavorite(product);
        }


        setIsFavorite(!isFavorite);
    };

    const handleLinkClick = (href: string) => {
        setLoading(true)
        setTimeout(() => {
            router.push(href)
            setLoading(false)
        }, 1400)
    }

    return (
        <div className="flex flex-col">
            <Card className='border-none group'>
                <div className="relative overflow-hidden aspect-square bg-gray-300 border-none">
                    {product.flashSale && product.discount > 0 && (
                        <div className="absolute -top-1 -left-2 py-1 px-4 rounded-lg bg-red-600 m-5 z-20">
                            <span className='text-white font-bold'>-{product?.discount * 100}%</span>
                        </div>
                    )}
                    <div className="absolute top-4 right-3 flex flex-col gap-y-4 z-20">
                        <Button className="px-1 py-1 rounded-full bg-white drop-shadow-md text-black" onClick={
                            isAuthenticated ? handleFavoriteClick : () => handleLinkClick('/login')
                        }>
                            <Icon icon={isFavorite ? 'material-symbols:favorite-rounded' : 'material-symbols:favorite-outline-rounded'}
                                className={isFavorite ? 'text-red-600' : 'text-gray-400'}
                                width="24" height="24" />
                        </Button>

                        <button onClick={() => {
                            isAuthenticated ? router.push(`/product/${product?._id}`) : handleLinkClick('/login')
                        }} className="px-1 py-1 rounded-full bg-white drop-shadow-md text-black">
                            <Icon icon="ic:baseline-remove-red-eye" width="24" height="24" />
                        </button>


                    </div>
                    <Image src={product?.image} alt={product.name} className=" object-contain md:p-10 p-20" width={450} height={450} />
                    <CardContent onClick={() => {
                        { isAuthenticated ? addItem(product) : handleLinkClick('/login') }
                    }} className="group-hover:flex group-hover:animate-slide-out-top hidden cursor-pointer absolute bottom-0 hover:bg-gray-400 bg-black w-full hover:opacity-70 duration-400 transition-all  items-center justify-center p-3 text-center text-white">
                        Add To Cart
                    </CardContent>
                </div>



            </Card>
            <div className="mt-5">
                <span className='font-bold' >{product.name}</span>
                <div className="flex mt-3 gap-x-3">
                    <span className='font-bold text-red-600'>${product.price}</span>
                    <s className='font-bold text-gray-500'>${product.price - (product.price * product.discount)}</s>
                </div>
            </div>
        </div>
    )
}
