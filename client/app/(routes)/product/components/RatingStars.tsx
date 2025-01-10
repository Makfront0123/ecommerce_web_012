import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useProductContext } from "@/context/productContext";

interface props {
    productId: string;
    totalStars?: number;
    currentRating?: number;
}

const RatingStars = ({ productId, totalStars = 5, currentRating }: props) => {
    const [rating, setRating] = useState(currentRating || 0);
    const { rateProduct } = useProductContext()

    const handleClick = async (index: number) => {
        setRating(index + 1);

        rateProduct(productId, rating)
    };

    const getStarClass = (index: number) => {
        return index < rating ? "text-yellow-400" : "text-gray-300";
    };

    return (
        <div className="flex items-center">
            {[...Array(totalStars)].map((_, index) => (
                <div
                    key={index}
                    className={`cursor-pointer ${getStarClass(index)}`}
                    onClick={() => handleClick(index)}
                >
                    <Icon icon="material-symbols:star" className="w-6 h-6" />
                </div>
            ))}

            <div className="ml-4 text-lg font-semibold">
                {rating} de {totalStars}
            </div>
        </div>
    );
};

export default RatingStars;
