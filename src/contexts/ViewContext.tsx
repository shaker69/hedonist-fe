'use client'

import React, { createContext, useContext, useState } from 'react';

interface ViewContextProps {
  isGrid: boolean;
  toggleView: () => void;
}

interface ViewContextProviderProps {
  children: React.ReactNode,
}

const ViewContext = createContext<ViewContextProps | undefined>(undefined);

export const ViewContextProvider: React.FC<ViewContextProviderProps> = ({ children }) => {
  const [isGrid, setIsGrid] = useState(false);

  const toggleView = () => {
    setIsGrid((prev) => !prev);
  };

  return (
    <ViewContext.Provider value={{ isGrid, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = (): ViewContextProps => {
  const context = useContext(ViewContext);

  if (!context) {
    throw new Error('useView must be used within a ViewProvider');
  }

  return context;
};
