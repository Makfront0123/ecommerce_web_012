import React from 'react';
import { Icon } from '@iconify/react';
import { SkeletonCard } from '../../product/components/SkeletonProduct';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, } from '../../../../components/ui/card';
import { useRouter } from 'next/navigation';

const CategoriesCarousel = ({ categories }: { categories: CategoryType[] }) => {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
        >
            <CarouselContent>
                {categories.map((categories: CategoryType) => {
                    return (
                        <CarouselItem key={categories._id} className="sm:basis-1/4 basis-3/4">
                            <div className="p-1">
                                <CardUtil category={categories} />
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

export default CategoriesCarousel;


const CardUtil = ({ category }: { category: CategoryType }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/category/${category._id}`)
    }

    if (category == null) {
        return <div className='mt-10'><SkeletonCard /></div>
    }

    return (
        <Card onClick={handleClick} className='cursor-pointer drop-shadow-md [&>div]:hover:text-white text-black hover:bg-red-600 duration-400 transition-colors bg-none border-2 flex items-center justify-center border-gray-300 min-h-[30vh] w-full mt-8'>
            <div className="flex flex-col items-center justify-center gap-y-3">
                <Icon icon={category.icon} width="80" height="80" />
                <span className='text-[20px]'>{category.name}</span>
            </div>
        </Card>
    )
}