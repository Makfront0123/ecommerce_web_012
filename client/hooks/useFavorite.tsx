
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


interface FavoriteStore {
    itemsFavorite: ProductType[],
    addFavorite: (data: ProductType) => void,
    removeFavorite: (id: string) => void,
}

export const UseFavorite = create(persist<FavoriteStore>((set, get) => ({
    itemsFavorite: [],
    addFavorite: (data: ProductType) => {
        const currentItem = get().itemsFavorite
        const existingItem = currentItem.find((item) => item._id == data._id)
        if (existingItem) {
            return toast.success("Product already exists in the list", {
                duration: 2000
            });
        }
        set({
            itemsFavorite: [...get().itemsFavorite, data]
        })
        toast.success("Product added to the list", { duration: 2000 });
    },
    removeFavorite: (id: string) => {
        set({
            itemsFavorite: [...get().itemsFavorite.filter((item) => item._id != id)]
        }),
            toast.success("Product removed from the list", { duration: 2000 });
    },

}), {
    name: 'favorite-storages',
    storage: createJSONStorage(() => localStorage)
},))