"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UseCart } from '@/hooks/useCart'
import { TableCardProducts } from './components/TableCardProducts';
import Link from 'next/link';
import DialogLoading from '@/components/DialogLoading';
import { useGlobalContext } from '@/context/globalContext';


export default function Cart() {
  const{loading}=useGlobalContext()
  const { items, updateItemQuantity } = UseCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const updateQuantity = (id: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
    updateItemQuantity(id, quantity); 
  };
  const total = items.reduce((total, item) => {
    const price = item.flashSale ? item.price * (1 - item.discount) : item.price;
    const quantity = quantities[item._id] || 1; 
    return total + price * quantity;
  }, 0);

  return (
    <div className="max-x-4xl py-16 sm:px-20 px-10">
      <div className="uppercase">
        <span className="text-gray-400 font-medium">
          HOME / <span className="text-black font-bold">Cart</span>
        </span>
        <div className="mt-20">
          {items.length === 0 ? (
            <p className="text-center">No products found in the cart</p>
          ) : (
            <TableCardProducts
              products={items}
              quantities={quantities}
              updateQuantity={updateQuantity}
            />
          )}
        </div>

        <div className="border-2 flex flex-col mx-auto mt-20 max-w-[100vh] p-10 border-gray-400 rounded-md min-h-[50vh]">
          <span className="text-[20px] mb-10 font-bold">Cart Total</span>
          <div className="flex items-center justify-between">
            <p className="text-sm">Subtotal</p>
            <p className="text-sm">${total.toFixed(2)}</p>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <p>Shipping</p>
            <p className="text-sm">FREE</p>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <p>Total</p>
            <p className="text-sm">${total.toFixed(2)}</p>
          </div>

          <Separator className="my-4" />
          <Link href={"/checkout"}>
            <Button className="max-w-4xl flex mx-auto py-5" variant="destructive">
              Proceed to checkout
            </Button>
          </Link>
        </div>
      </div>
      {loading && <DialogLoading />}
    </div>
  );
}



