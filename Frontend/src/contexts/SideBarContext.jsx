import { createContext, useState, useEffect, useContext } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const [activeIndex, setActiveIndex] = useState(() => {
    const storedIndex = localStorage.getItem("activeIndex");
    return storedIndex ? parseInt(storedIndex) : 0;
  });

  // Save activeIndex to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeIndex", activeIndex);
  }, [activeIndex]);

  // Opens/closes the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider
      value={{ isOpen, toggleSidebar, activeIndex, setActiveIndex }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use the sidebar context
export const useSidebar = () => {
  return useContext(SidebarContext);
};
