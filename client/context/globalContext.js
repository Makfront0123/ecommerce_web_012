"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://ecommerce-web-012.onrender.com";
axios.defaults.withCredentials = true;

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const login = async (email, password) => {
        setLoading(true);
        try {
            if (!email) {
                toast.error("Email is required");
                return;
            }
            if (!password) {
                toast.error("Password is required");
                return;
            }
            if (!email.includes("@")) {
                toast.error("Invalid email");
                return;
            }
            const response = await axios.post(`/api/v1/login`, { email, password });
            setUser(response.data.user);
            setIsAuthenticated(true);

            toast.success("Logged in successfully");
            router.push("/");
        } catch (error) {
            console.error(error);
            toast.error("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        try {
            if (!name) {
                toast.error("Name is required");
                return;
            }
            if (!email) {
                toast.error("Email is required");
                return;
            }
            if (!password) {
                toast.error("Password is required");
                return;
            }
            if (!email.includes("@")) {
                toast.error("Invalid email");
                return;
            }
            await axios.post(`/api/v1/register`, { name, email, password });
            await login(email, password)
        } catch (error) {
            console.error(error);
            toast.error("Error Registering");
        } finally {
            setLoading(false);
        }
    };





    const logout = async () => {
        try {
            await axios.post(`/api/v1/logout`);
            setIsAuthenticated(false);
            setUser(null);
            setUserProfile(null);
            toast.success("Logged out successfully");
            router.push("/");
        } catch (error) {
            console.error(error);
            toast.error("Error logging out");
        } finally {
            setLoading(false);
        }
    };


    const checkAuth = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/v1/check-auth`);
            setIsAuthenticated(response.data.isAuthenticated);
            setUser(response.data.user);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };





    const getUserProfile = async (id) => {

        try {
            const response = await axios.get(`/api/v1/profile/${id}`);
            setUserProfile(response.data);
        } catch (error) {
            console.error("Error al obtener el perfil:", error);
        }
    };

    const updateUserProfile = async (
        name,
        email,
        currentPassword,
        password,
        confirmPassword
    ) => {
        setLoading(true);
        try {
        
            if (!name && !email && !currentPassword && !password && !confirmPassword) {
                throw new Error('At least one field must be updated');
            }
    
            const data = {};
    
        
            if (name) data.name = name;
            
        
            if (email) data.email = email;
    
           
            if (currentPassword && password && confirmPassword) {
                
                if (password !== confirmPassword) {
                    throw new Error('Passwords do not match');
                }
    
                
                data.currentPassword = currentPassword;
                data.password = password;
                data.confirmPassword = confirmPassword;
            }
    
           
            const response = await axios.put(`/api/v1/user/${user._id}`, data);
            
            if (response.status === 200) {
                toast.success('Profile updated successfully');
    
               
                if (name) {
                    setUser((prevUser) => ({ ...prevUser, name }));
                }
                if (email) {
                    setUser((prevUser) => ({ ...prevUser, email }));
                }
            }
        } catch (error) {
            console.error(error);
    
          
            toast.error(error?.response?.data?.message || error.message || 'Error updating profile');
        } finally {
            setLoading(false);
        }
    };
    




    useEffect(() => {
        checkAuth();

    }, []);

    useEffect(() => {
        if (isAuthenticated && user) {
            getUserProfile(user._id);
        }
    }, [isAuthenticated, user]);



    return (
        <GlobalContext.Provider
            value={{ isAuthenticated, user, userProfile, loading, login, logout, register, updateUserProfile }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
