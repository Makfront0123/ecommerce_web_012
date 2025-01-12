"use client"

import { Separator } from '@/components/ui/separator'
import { useOrderContext } from '@/context/orderContext'
import { UseCart } from '@/hooks/useCart'
import Image from 'next/image'

import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

import { useGlobalContext } from '@/context/globalContext'
import toast from 'react-hot-toast'
import DialogLoading from '@/components/DialogLoading'
import { CheckoutForm } from './components/CheckoutForm'
import { BankOption } from './components/BankOption'


const Checkout = () => {
    const { user } = useGlobalContext();
    const pathname = usePathname();
    const path = pathname.split('/');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');

    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const { createOrder, loading } = useOrderContext();
    const { items } = UseCart();

    const total = items.reduce((total, item) => {
        const price = item.flashSale ? item.price * (1 - item.discount) : item.price;
        const quantity = 1;
        return total + price * quantity;
    }, 0);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!paymentMethod) {
            toast.error('Please select a payment method');
            return;
        }

        const products = items.map((item) => ({
            productId: item?._id,
            quantity: item?.quantity || 1,
            price: item?.price,
        }));

        const orderData = {
            user: user?._id,
            totalAmount: total,
            shippingAddress: address,
            paymentMethod: paymentMethod,
            products: products,
        };

        await createOrder(orderData);
    };

    return (
        <>
            <div className="flex flex-col items-start p-20 justify-center w-full min-h-screen">
                <div className="flex items-center mt-10 justify-between w-full">
                    <div className="uppercase">
                        <span className="text-gray-400 font-medium">
                            HOME / <span className="text-black font-bold">{path}</span>
                        </span>
                    </div>
                </div>
                <h4 className="mt-20 text-3xl font-extrabold">Billing Details</h4>
                <div className="grid lg:grid-cols-12 lg:gap-x-20 sm:gap-x-10 gap-x-16 mt-10">
                    <CheckoutForm
                        handleSubmit={handleSubmit}
                        setName={setName}
                        setAddress={setAddress}
                        name={name}
                        address={address}
                    />
                    <div className="flex flex-col col-span-6 p-5 gap-y-4 sm:mt-0 mt-10 w-full h-full">
                        {items.map((item:ProductType) => (
                            <div key={item?._id} className="flex items-center justify-between border-b-2 border-gray-100 py-2">
                                <div className="flex items-center gap-x-2">
                                    <Image src={item.image} alt={item.name} width={50} height={100} />
                                    <span className="text-sm">${item?.name}</span>
                                </div>
                                <span>${item.flashSale ? item.price * (1 - item.discount) : item.price}</span>
                            </div>
                        ))}
                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                Subtotal
                                <span>${total}</span>
                            </div>
                            <Separator className="my-5" />
                            <div className="flex items-center justify-between">
                                Shipping
                                <span>FREE</span>
                            </div>
                            <Separator className="my-5" />
                            <div className="flex items-center justify-between">
                                Total
                                <span>${total}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-10 gap-20">

                            <BankOption
                                name="Paypal"
                                icon="bi:paypal"
                                setPaymentMethod={setPaymentMethod}
                                selected={paymentMethod === 'Paypal'}
                            />
                            <BankOption
                                name="Stripe"
                                icon="bi:stripe"
                                setPaymentMethod={setPaymentMethod}
                                selected={paymentMethod === 'Stripe'}
                            />
                            <BankOption
                                name="Credit Card"
                                icon="ant-design:credit-card-filled"
                                setPaymentMethod={setPaymentMethod}
                                selected={paymentMethod === 'Credit Card'}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {loading && <DialogLoading />}
        </>
    );
};
export default Checkout