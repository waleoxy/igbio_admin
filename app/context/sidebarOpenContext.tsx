"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type SidebarOpenContextProps = {
  openSidebar: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const SidebarOpenContext = createContext<SidebarOpenContextProps>({
  openSidebar: () => {},
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});

interface SidebarOpenContextProviderProps {
  children: ReactNode;
}

export const SidebarOpenContextProvider = ({
  children,
}: SidebarOpenContextProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <SidebarOpenContext.Provider
      value={{ isSidebarOpen, openSidebar, setIsSidebarOpen }}>
      {children}
    </SidebarOpenContext.Provider>
  );
};
