import { createContext, useContext, useState } from "react";

export const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeToggle, setThemeToggle] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === null ? true : saved === 'light';
    });

    const themeToggleFun = () => {
        setThemeToggle(prev => !prev);
        localStorage.setItem('theme', themeToggle)
    }

    return (
        <themeContext.Provider value={{themeToggle, themeToggleFun}}>
            {children}
        </themeContext.Provider>
    )
};

export const useTheme = () => {
    const themeContextValue = useContext(themeContext);
    if (!themeContextValue) {
        throw new Error("useContext used outside of the provider")
    }
    return themeContextValue;
}