import { Button } from "@/components/ui/button"

interface CheckoutProps {
    setName: React.Dispatch<React.SetStateAction<string>>;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    name: string;
    handleSubmit: (event: React.FormEvent) => void;
    address: string;
}
export const CheckoutForm = ({ setName, setAddress, name, handleSubmit, address }: CheckoutProps) => {

    return (
        <form action="" onSubmit={handleSubmit} method='POST' className='col-span-6 flex flex-col gap-y-8'>
            <div className='flex flex-col'>
                <label htmlFor="name" className='text-sm font-medium text-gray-400'>Name</label>
                <input
                    name='name'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='bg-gray-200 mt-2 focus:border-red-600 duration-400 transition p-2 rounded-[10px]' placeholder='Name' />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="name" className='text-sm font-medium text-gray-400'>Address</label>
                <input
                    name='address'
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className='bg-gray-200 mt-2 focus:border-red-600 duration-400 transition p-2 rounded-[10px]' placeholder='Name' />
            </div>


            <div className="col-span-6">
                <Button
                    className='mt-20 px-10 py-5  text-white font-medium flex mx-auto  bg-red-600 rounded-md hover:scale-105 duration-200'>
                    Place Order
                </Button>
            </div>
        </form>

    )
}