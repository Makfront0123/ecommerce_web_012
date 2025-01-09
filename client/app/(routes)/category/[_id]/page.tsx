"use client"
import { useProductContext } from '@/context/productContext';
import React from 'react';
import { SkeletonCard } from '../../product/components/SkeletonProduct';
import { CardUtil } from '../components/CardUtils';


const Category = () => {
    const { categoryProduct, loading } = useProductContext();

    return (
        <div className="relative grid md:grid-cols-4 grid-cols-1 gap-8 p-20">

            {
                categoryProduct.map((product: ProductType) => {
                    return (
                        loading ? <SkeletonCard />
                            : <CardUtil product={product} />
                    );
                })
            }
            {
                categoryProduct.length === 0 && <div className="absolute inset-0 flex mx-auto items-center justify-center">

                    <h2 className="text-2xl font-semibold text-gray-400 mt-10">No products found</h2>
                </div>
            }

        </div>
    );
};

export default Category;



