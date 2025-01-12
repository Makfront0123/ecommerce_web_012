import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { UseCart } from '@/hooks/useCart';
import { useGlobalContext } from './globalContext';

axios.defaults.baseURL = "https://ecommerce-web-012.onrender.com";
axios.defaults.withCredentials = true;

const OrderContext = createContext();
export const OrderContextProvider = ({ children }) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const {userProfile}=useGlobalContext();
    const { removeAll } = UseCart()
    const router = useRouter()
    const getOrders = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/v1/all-orders')
            setOrders(response.data)

            setLoading(false)
        } catch (error) {

            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    
    const createOrder = async (orderData) => {
        const orderDataUser={
            ...orderData,
            user:userProfile._id,
        }
        setLoading(true)
        try {
            const response = await axios.post(`/api/v1/create-order`, orderDataUser)
            toast.success('Order created successfully')
            setOrders(response.data)
            setLoading(false)
            removeAll()
            router.push('/')
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    const editOrder = async (id) => {
        setLoading(true)
        try {
            const response = await axios.put(`/api/v1/order/${id}`)
            toast.success('Order updated successfully')
            setOrders(response.data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    const deleteOrder = async (id) => {
        setLoading(true)
        try {
            const response = await axios.delete(`/api/v1/order/${id}`)
            toast.success('Order deleted successfully')
            setOrders(response.data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    const getOrderById = async (id) => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/v1/order/${id}`)
            setOrders(response.data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }


    



    return (
        <OrderContext.Provider value={{
            orders,
            loading,
            createOrder
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrderContext = () => {
    return useContext(OrderContext);
}