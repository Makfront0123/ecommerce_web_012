import { Card, CardContent } from '../../../../components/ui/card';
import Image from 'next/image';
import { UseCart } from '@/hooks/useCart';
import { Button } from '../../../../components/ui/button';
import { UseFavorite } from '@/hooks/useFavorite';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/globalContext';
import { useState } from 'react';
export const CardUtil = ({ product }: { product: ProductType }) => {
    const { addItem } = UseCart()
    const { addFavorite, removeFavorite, itemsFavorite } = UseFavorite()
    const [isFavorite, setIsFavorite] = useState(itemsFavorite.some((item) => item._id === product?._id));
    const router = useRouter()
    const { isAuthenticated } = useGlobalContext()
    const handleFavoriteClick = () => {
        if (isFavorite) {

            removeFavorite(product._id);
        } else {

            addFavorite(product);
        }


        setIsFavorite(!isFavorite);
    };

    const handleLinkClick = (href: string) => {
        router.push(href);
    };

    return (
        <div className="flex flex-col">
            <Card className='border-none group'>
                <div className="relative overflow-hidden aspect-square rounded-lg shadow-lg">
                    {product.flashSale && product.discount > 0 && (
                        <div className="absolute -top-1 -left-2 py-1 px-4  bg-red-600 m-5 z-20">
                            <span className="text-white font-bold">
                                -{product.discount * 100}%
                            </span>
                        </div>
                    )}
                    <div className="absolute top-4 right-3 flex flex-col gap-y-4 z-20">
                        ...
                    </div>

                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        priority
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <CardContent
                        onClick={() => {
                            if (isAuthenticated) addItem(product)
                            else handleLinkClick('/login')
                        }}
                        className="group-hover:flex hidden cursor-pointer absolute bottom-0 bg-black/70 w-full items-center justify-center p-3 text-center text-white"
                    >
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
