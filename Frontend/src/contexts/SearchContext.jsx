import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <SearchContext.Provider value={{ hasSearched, setHasSearched }}>
      {children}
    </SearchContext.Provider>
  );
};
