import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext(null);

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark');

    // If they set the theme to 'light', setTheme to 'light'
    // If they set the theme to 'dark', setTheme to 'dark'

    function toggleTheme() {
        // If the theme is 'dark', setTheme to 'light'
        // if (theme === 'dark') {
        //     setTheme('light');
        // If the theme is 'light', setTheme to 'dark'
        // } else if (theme === 'light') {
        //     setTheme('dark');
        // }
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme}>
            {/* children represent all our pages */}
            {children}
            </div>
        </ThemeContext.Provider>
    )
}