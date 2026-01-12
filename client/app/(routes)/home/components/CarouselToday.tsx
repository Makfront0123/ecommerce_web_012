import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import CardUtil from './CardUtil';
const CarouselToday = ({ product }: { product: ProductType[] }) => {
    return (
        <div className="w-screen max-w-full overflow-x-hidden">
            <Carousel
                opts={{
                    align: "start",
                    containScroll: "trimSnaps",
                }}
                className="w-full"
            >
                <CarouselContent className="flex gap-4 px-4">
                    {product.map((product: ProductType) => (
                        <CarouselItem
                            key={product._id}
                            className="flex-none w-[250px] md:w-[300px] lg:w-[350px]"
                        >
                            <CardUtil product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};


export default CarouselToday;