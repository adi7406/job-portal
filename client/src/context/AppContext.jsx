import { createContext,useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [searchFilter , setSearchFilter] = useState({
        title:'',
        location:''
    });

    const [isSearched, setIsSearched] = useState(false);

    const value = {
        setSearchFilter,searchFilter,
        setIsSearched ,isSearched,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};