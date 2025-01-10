"use client"

import { Icon } from '@iconify/react';
import { useProductContext } from '@/context/productContext';

import Image from 'next/image';
import { UseCart } from '@/hooks/useCart';

import { UseFavorite } from '@/hooks/useFavorite';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/globalContext';
import { useState } from 'react';
import { SkeletonCard } from '@/app/(routes)/product/components/SkeletonProduct';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

import DialogLoading from './DialogLoading';

const SearchProducts: React.FC = () => {
    const { products, searchProducts, loading } = useProductContext();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchLoad, setSearchLoad] = useState<boolean>(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim().length > 0) {
            searchProducts(value, '');
            setIsOpen(true);
        } else {
            searchProducts('', '');
            setIsOpen(false);
        }
    };

    return (
        <div className="search-container">
            <input
                type="search"
                id="search"
                name="search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search products..."
                className="search-input"
            />
            {searchLoad && <DialogLoading />}

            {loading ? null : searchTerm.trim().length === 0 ? null : (
                <div className={`fixed left-0 top-0 animate-slide-in-left inset-0 overflow-y-scroll bg-white drop-shadow-lg p-20 max-w-3xl min-h-[204vh] z-50 ${isOpen ? '' : 'hidden'}`}>
                    {products.length > 0 ? (
                        <div className="flex flex-col gap-y-10">
                            {products.map((product: ProductType) => (
                                <CardUtil key={product._id} product={product} setIsOpen={setIsOpen} setSearchLoad={setSearchLoad} />
                            ))}
                        </div>
                    ) : (
                        <p>No se encontraron productos.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchProducts;


export const CardUtil = ({ product, setIsOpen, setSearchLoad }: { product: ProductType, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, setSearchLoad: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { addItem } = UseCart();
    const { addFavorite, removeFavorite, itemsFavorite } = UseFavorite();
    const [isFavorite, setIsFavorite] = useState(itemsFavorite.some((item) => item._id === product?._id));
    const router = useRouter();
    const { isAuthenticated } = useGlobalContext();

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFavorite(product._id);
        } else {
            addFavorite(product);
        }

        setIsFavorite(!isFavorite);
    };

    const handleLinkClick = (href: string) => {
        setSearchLoad(true);
        setTimeout(() => {
            router.push(href);
            setSearchLoad(false);
        }, 2000);
    };

    if (product == null) {
        return <div className="mt-10"><SkeletonCard /></div>;
    }

    const shortDescription = product?.description?.slice(0, 100);
    return (
        <div className="relative flex flex-col">
            <Card className="border-none group flex gap-x-5">
                <div className="relative max-w-[15rem] max-h-[20rem]">
                    {product.flashSale && product.discount > 0 && (
                        <div className="absolute -top-1 -left-2 py-1 px-4 rounded-lg bg-red-600 m-5 z-20">
                            <span className="text-white font-bold">-{product?.discount * 100}%</span>
                        </div>
                    )}

                    <Image src={product.image} alt={product.name} className="bg-gray-600 object-contain p-10" width={200} height={200} />
                </div>
                <div className="mt-2 px-5 max-w-[20rem]">
                    <span className="font-bold">{product.name}</span>
                    <p className="text-[10px]">{shortDescription}</p>
                    <div className="flex mt-3 gap-x-3">
                        <span className="font-bold text-red-600">${product.price}</span>
                        <s className="font-bold text-gray-500">${product.price - (product.price * product.discount)}</s>
                    </div>
                </div>

                <div className="absolute top-2 right-3 flex flex-col gap-y-4 z-20">
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

                <CardContent onClick={() => {
                    if (isAuthenticated) {
                        addItem(product)
                    } else {
                        handleLinkClick('/login');
                    }
                }} className="group-hover:flex group-hover:animate-slide-out-top hidden cursor-pointer absolute bottom-0 hover:bg-gray-400 bg-black w-full hover:opacity-70 duration-400 transition-all  items-center justify-center p-3 text-center text-white">
                    Add To Cart
                </CardContent>
            </Card>
        </div>
    );
};