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
import { CardSearchProduct } from './CardSearchProduct';

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
                className="sm:max-w-2xl max-w-[23vh]"
            />
            {searchLoad && <DialogLoading />}

            {loading ? null : searchTerm.trim().length === 0 ? null : (
                <div className={`fixed left-0 top-0 animate-slide-in-left inset-0 overflow-y-scroll bg-white drop-shadow-lg  sm:max-w-3xl max-w-[50vh] min-h-[204vh] z-50 ${isOpen ? '' : 'hidden'}`}>
                    {products.length > 0 ? (
                        <div className="flex flex-col gap-y-10">
                            {products.map((product: ProductType) => (
                                <CardSearchProduct key={product._id} product={product} setSearchLoad={setSearchLoad} />
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


