'use client';
import { GlobalContextProvider } from '../context/globalContext';
import { ProductContextProvider } from '../context/productContext';
import { CategoryContextProvider } from '../context/categoryContext';
import { OrderContextProvider } from '../context/orderContext';

interface props {
    children: React.ReactNode;
}


export const ContextProvider = ({ children }: props) => {
    return (
        <GlobalContextProvider>
            <ProductContextProvider>
                <CategoryContextProvider>
                    <OrderContextProvider>
                        {children}
                    </OrderContextProvider>
                </CategoryContextProvider>
            </ProductContextProvider>
        </GlobalContextProvider>
    )
}