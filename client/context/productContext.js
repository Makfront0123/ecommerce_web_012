import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

const ProductContext = createContext();
export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
    const [catProduct, setCatProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const id = params._id


    const getProducts = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/v1/all-products`)
            setProducts(response.data)
        } catch (error) {

            console.error(error)
        } finally {
            setLoading(false)
        }
    }



    const getProductByCategory = async (id) => {

        setLoading(true)
        try {

            const response = await axios.get(`/api/v1/product-category/${id}`)
            setCatProduct(response.data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getProductById = async (id) => {

        setLoading(true)
        try {

            const response = await axios.get(`/api/v1/product/${id}`)
            setProduct(response.data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }





    useEffect(() => {
        getProducts();
    }, [])


    useEffect(() => {
        if (id) {
            getProductById(id);
            getProductByCategory(id);
        }
    }, [id]);


    const searchProducts = async (name, category) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();

            if (name) queryParams.append('name', name);

            if (category) queryParams.append('category', category);


            const response = await axios.get(`/api/v1/product-search?${queryParams.toString()}`);

            setProducts(response.data);
        } catch (error) {
            console.error("Error al buscar productos:", error);
        } finally {
            setLoading(false);
        }
    };



    const rateProduct = async (productId, rating) => {
        setLoading(true)
        try {
            const response = await axios.post(`/api/v1/rate-product/${productId}`)
            toast.success('Product rated successfully')
            setProducts(response.data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <ProductContext.Provider value={{
            products,
            product,
            loading,
            categoryProduct: catProduct,
            getProductByCategory,
            searchProducts
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => {
    return useContext(ProductContext);
}