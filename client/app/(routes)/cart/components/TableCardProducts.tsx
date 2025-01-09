import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { Icon } from '@iconify/react'
import { UseCart } from "@/hooks/useCart"
import { ButtonCountCart } from "./ButtonCount"



export const TableCardProducts = ({ products, quantities, updateQuantity }: { products: ProductType[], quantities: { [key: string]: number }, updateQuantity: (id: string, quantity: number) => void }) => {
    const { removeItem } = UseCart()
    const getSubtotal = (item: ProductType) => {
        const price = item.flashSale ? item.price * (1 - item.discount) : item.price;
        const quantity = quantities[item._id] || 1; // Usamos la cantidad actual desde el estado
        return price * quantity;
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((item) => {
                    const dPrice = item.flashSale ? item.price * (1 - item.discount) : item.price;
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
                                {item.flashSale ? (
                                    <div className="flex items-center gap-x-4">
                                        <span className="text-red-600 font-medium">${item.price.toFixed(2)}</span>
                                        <s className="text-gray-400 font-medium">${dPrice.toFixed(2)}</s>
                                    </div>
                                ) : (
                                    <span className="text-red-600 font-medium">${item.price.toFixed(2)}</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <ButtonCountCart
                                    price={item.price}
                                    item={item}
                                    quantity={quantity}
                                    onQuantityChange={updateQuantity}
                                />
                            </TableCell>
                            <TableCell className="text-right">${getSubtotal(item).toFixed(2)}</TableCell>
                            <Button className="px-3 py-3 mt-3 ml-8 flex mx-auto" variant="destructive" onClick={() => { removeItem(item._id) }}>
                                <Icon icon="material-symbols:delete-outline-sharp" width="24" height="24" />
                            </Button>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

