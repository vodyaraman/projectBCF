import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('backgroundTheme'));

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('backgroundTheme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, handleThemeChange }}>
            {children}
        </ThemeContext.Provider>
    );
};