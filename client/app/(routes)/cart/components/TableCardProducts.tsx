'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Icon } from '@iconify/react';
import { UseCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ButtonCountCart } from "./ButtonCount";


interface TableCardProductsProps {
    products: ProductType[];
    quantities: { [key: string]: number };
    updateQuantity: (id: string, quantity: number) => void;
}

export const TableCardProducts: React.FC<TableCardProductsProps> = ({
    products,
    quantities,
    updateQuantity,
}) => {
    const { removeItem } = UseCart();

    const getSubtotal = (item: ProductType) => {
        const discountedPrice = item.flashSale ? item.price * (1 - item.discount / 100) : item.price;
        const quantity = quantities[item._id] || 1;
        return discountedPrice * quantity;
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {products.map(item => {
                    const discountedPrice = item.flashSale ? item.price * (1 - item.discount / 100) : item.price;
                    const quantity = quantities[item._id] || 1;

                    return (
                        <TableRow key={item._id}>
                            <TableCell className="font-medium">
                                <div className="flex sm:flex-row flex-col items-center gap-5">
                                    <Image src={item.image} alt={item.name} width={50} height={100} />
                                    <span className="text-sm">{item.name}</span>
                                </div>
                            </TableCell>

                            <TableCell className="flex gap-6">
                                {item.flashSale && item.discount > 0 ? (
                                    <div className="flex items-center gap-x-4">
                                        <span className="text-red-600 font-medium">${discountedPrice.toFixed(2)}</span>
                                        <s className="text-gray-400 font-medium">${item.price.toFixed(2)}</s>
                                    </div>
                                ) : (
                                    <span className="text-red-600 font-medium">${item.price.toFixed(2)}</span>
                                )}
                            </TableCell>

                            <TableCell>
                                <ButtonCountCart
                                    item={item}
                                    quantity={quantity}
                                    onQuantityChange={updateQuantity}
                                />
                            </TableCell>

                            <TableCell className="text-right">${getSubtotal(item).toFixed(2)}</TableCell>

                            <TableCell>
                                <Button
                                    className="px-3 py-3 mt-3 flex mx-auto"
                                    variant="destructive"
                                    onClick={() => removeItem(item._id)}
                                >
                                    <Icon icon="material-symbols:delete-outline-sharp" width="24" height="24" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
