import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const handleSetUser = (newUser) => {
        setUser(newUser);
    };

    return (
        <AuthContext.Provider value={{ user, handleSetUser }}>
            {children}
        </AuthContext.Provider>
    );
};