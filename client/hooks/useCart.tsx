import toast from 'react-hot-toast'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


interface CartStore {
    items: ProductType[],
    addItem: (data: ProductType) => void,
    removeItem: (id: string) => void,
    removeAll: () => void,
    updateItemQuantity: (id: string, quantity: number) => void,

}

export const UseCart = create(persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: ProductType) => {
        const currentItem = get().items;
        const existingItem = currentItem.find((item) => item._id === data._id);
        if (existingItem) {
            const updatedItems = currentItem.map(item =>
                item._id === data._id
                    ? { ...item, quantity: item.quantity + data.quantity }
                    : item
            );
            set({ items: updatedItems });
            return toast.success("Product already exists in the cart", { duration: 2000 });
        } else {
            set({ items: [...currentItem, data] });
        }

        toast.success("Product added to the cart", { duration: 2000 });
    },
    removeItem: (id: string) => {
        set({
            items: get().items.filter((item) => item._id !== id)
        });
        toast.success("Product removed from the cart", { duration: 2000 });
    },
    removeAll: () => set({ items: [] }),
    updateItemQuantity: (id: string, quantity: number) => {
        const updatedItems = get().items.map(item =>
            item._id === id ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
    }
}), {
    name: 'cart-storages',
    storage: createJSONStorage(() => localStorage)
}));
