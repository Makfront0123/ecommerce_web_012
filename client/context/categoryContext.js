import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useProductContext } from './productContext';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
    const { product } = useProductContext()
    const [allCategories, setCategories] = useState([]);
    const [categoryById, setCategoryById] = useState({});
    const [loading, setLoading] = useState(false);

    const categoryId = product?.category;

    const getCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/v1/categories');
            if (Array.isArray(response.data)) {
                setCategories(response.data);
            } else {
                console.error('La respuesta de la API no es un arreglo:', response.data);
                setCategories([]); 
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryById = async (categoryId) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/v1/categories/${categoryId}`);
            setCategoryById(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener la categoría:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (categoryId) {
            getCategoryById(categoryId);
        }
    }, [categoryId]);

    return (
        <CategoryContext.Provider value={{ allCategories, categoryById, loading, setLoading }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategoryContext = () => {
    return useContext(CategoryContext);
};
