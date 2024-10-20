import { createContext, useState } from "react";

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <SearchContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </SearchContext.Provider>
    )
}