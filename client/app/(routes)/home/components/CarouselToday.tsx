import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { SkeletonCard } from '../../product/components/SkeletonProduct';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '../../../../components/ui/card';
import Image from 'next/image';
import { UseCart } from '@/hooks/useCart';
import { Button } from '../../../../components/ui/button';
import { UseFavorite } from '@/hooks/useFavorite';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/globalContext';
import DialogLoading from '@/components/DialogLoading';

const CarouselToday = ({ product }: { product: ProductType[] }) => {

    return (

        <Carousel
            opts={{
                align: "center",
            }}
            className="w-full"
        >
            <CarouselContent className='flex'>
                {product.map((product: ProductType) => {
                    return (
                        <CarouselItem key={product._id} className="lg:basis-1/3 md:basis-1/2 basis-4/5">

                            <div className="p-1">
                                <CardUtil product={product} />
                            </div>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    );
};

export default CarouselToday;


const CardUtil = ({ product }: { product: ProductType }) => {
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




    if (product == null) {
        return <div className='mt-10'><SkeletonCard /></div>
    }
    return (
        <>
            <div className="flex flex-col">
                <Card className='border-none group'>
                    <div className="relative overflow-hidden aspect-square border-none">

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

                            <Button
                                onClick={() => {
                                    if (isAuthenticated) {
                                        router.push(`/product/${product?._id}`);
                                    } else {
                                        handleLinkClick('/login');
                                    }
                                }}
                                className="px-1 py-1 rounded-full bg-white drop-shadow-md text-black"
                            >
                                <Icon icon="ic:baseline-remove-red-eye" width="24" height="24" />
                            </Button>


                        </div>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />

                        <CardContent onClick={() => {
                            if (isAuthenticated) {
                                addItem(product)
                            } else {
                                handleLinkClick('/login');
                            }
                        }} className="group-hover:flex group-hover:animate-slide-out-top hidden cursor-pointer absolute bottom-0 hover:bg-gray-400 bg-black w-full hover:opacity-70 duration-400 transition-all  items-center justify-center p-3 text-center text-white">
                            Add To Cart
                        </CardContent>
                    </div>
                </Card>
                <div className="mt-5">
                    <span className='font-bold' >{product.name}</span>
                    <div className="flex mt-3 gap-x-3">
                        <span className='font-bold text-red-600'>${product.price}</span>
                        {
                            product.flashSale && <s className='font-bold text-gray-500'>${product.price - (product.price * product.discount)}</s>
                        }
                    </div>
                </div>
            </div>
            {loading && <DialogLoading />}
        </>
    )
}

