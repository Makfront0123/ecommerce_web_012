import { UseCart } from "@/hooks/useCart";

export const ButtonCountCart = ({item, onQuantityChange, quantity }: { item: ProductType, onQuantityChange: (id: string, quantity: number) => void, quantity: number }) => {
    const { updateItemQuantity } = UseCart();

    const increment = () => {
        const newQuantity = quantity + 1;
        onQuantityChange(item._id, newQuantity);
        updateItemQuantity(item._id, newQuantity);
    };

    const decrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            onQuantityChange(item._id, newQuantity);
            updateItemQuantity(item._id, newQuantity);
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, parseInt(e.target.value, 10)); 
        onQuantityChange(item._id, value); 
        updateItemQuantity(item._id, value);
    };

    return (
        <form className="max-w-xs mx-auto">
            <div className="relative flex items-center min-w-[2rem]">
                <button
                    type="button"
                    onClick={decrement}
                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                    </svg>
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    min="1"
                />
                <button
                    type="button"
                    onClick={increment}
                    className="bg-red-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                    <svg className="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                </button>
            </div>
        </form>
    );
};
