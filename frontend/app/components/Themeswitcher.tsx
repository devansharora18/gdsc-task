import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const Themeswitcher = () => {
    const [theme, setTheme] = useState<string>("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
	}

    return (
        <div 
            onClick={toggleTheme} 
            className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-[var(--card)] shadow-lg transition-colors duration-300 ease-in-out`}
        >
            {theme === "dark" ? <Moon /> : <Sun />}
        </div>
    );
};

export default Themeswitcher;
