import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const BASE_URL = 'https://localhost:7013/api/';
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        // Check if the token is already stored in local storage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }

        // Check if the currentUser is already stored in local storage
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser) {
            setCurrentUser(currentUser);
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/login`, {
                username,
                password,
            });
            const newToken = response.data.token;
            setToken(newToken);
            localStorage.setItem('token', newToken);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logout = () => {
        setToken('');
        setCurrentUser('');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    // Add an interceptor to add the token to all requests
    axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    return (
        <AuthContext.Provider value={{ token, currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// export default AuthContext;

export const useAuth = () => useContext(AuthContext);