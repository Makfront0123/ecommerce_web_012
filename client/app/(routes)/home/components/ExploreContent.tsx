import { useProductContext } from "@/context/productContext";
import CarouselToday from "./CarouselToday"
import AnimateOnScroll from "@/components/AnimationOnScroll";

const ExploreContent = () => {
    const { products } = useProductContext();
    const unsaleProducts = products.filter((product: ProductType) => product?.flashSale === false);
    return (
        <div className=' flex flex-col w-full min-h-[100vh] border-b-2  border-gray-100'>
            <div className="flex sm:items-start items-center justify-between  mt-10 gap-x-20">
                <div className="flex items-center gap-20">
                    <h2 className=' text-3xl font-semibold'>Explore Our Products</h2>

                </div>

            </div>
            <div className="mt-20">
                {
                    products.length > 0 &&
                    <AnimateOnScroll animationClass="opacity-0 translate-x-10" animateClass="opacity-100 translate-x-0">
                        <CarouselToday product={unsaleProducts} />
                    </AnimateOnScroll>

                }
                {
                    products.length === 0 && <div className="flex items-center justify-center">

                        <h2 className="text-2xl font-semibold text-gray-400 mt-10">No products found</h2>
                    </div>
                }
            </div>
            <button className='mt-20 mb-20 py-3 px-12 text-white font-medium flex mx-auto  bg-red-600 rounded-md hover:scale-105 duration-200'>View All Products</button>
        </div>
    )
}

export default ExploreContent