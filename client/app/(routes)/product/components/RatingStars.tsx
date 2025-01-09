import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useProductContext } from "@/context/productContext";

const RatingStars = ({ productId, totalStars = 5, currentRating }: any) => {
    const [rating, setRating] = useState(currentRating || 0);
    const { rateProduct } = useProductContext()


    // Maneja el clic de una estrella
    const handleClick = async (index: any) => {
        setRating(index + 1);

        rateProduct(productId, rating)
    };

    // Obtener la clase de la estrella (para mostrarla llena o vacía)
    const getStarClass = (index: any) => {
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
