import { createContext, useContext, useEffect, useState } from "react";

const GlobalStateContext = createContext({
  isMobile: false,
});

type GlobalStateProviderProps = {
  children: React.ReactNode;
};

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(min-width: 1000px)").matches);
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <GlobalStateContext.Provider value={{ isMobile }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
