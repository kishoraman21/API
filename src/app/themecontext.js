// "use client";
// import React , {useContext, createContext, useState, useEffect} from 'react';

// const ThemeContext = createContext({
//     theme: 'light',
//     toggleTheme: () => {},
// });

// //custom hook 

// export const useTheme = () => useContext(ThemeContext);

// //providdr component 

// export const ThemeProvider = ({children}) => {
//    const [theme, setTheme] = useState(() => {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('theme') || 'light';
//     }
//     return 'light';
//   });

//   useEffect(() => {
//     const root = window.document.documentElement;
    
//     // Set the theme class/attribute on the root element (important for Tailwind CSS or global styles)
//     root.setAttribute('data-theme', theme);
    
//     // Store the preference
//     localStorage.setItem('theme', theme);
//   }, [theme]);


//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   const contextValue = {
//     theme,
//     toggleTheme,
//   };

//   return (
//     <ThemeContext.Provider value={contextValue}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };