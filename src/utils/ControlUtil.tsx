import { createContext, useContext, useEffect, useState } from "react";
import { pixelTransition } from "../components/PixelGrid";

// Define the shape of the context
interface GlobalStateContextType {
  isMobile: boolean;
  currentPage: number;
  startTransitionGlobal: (page: number) => void;
}

// Create the context with a default value
const GlobalStateContext = createContext<GlobalStateContextType>({
  isMobile: false,
  currentPage: 0,
  startTransitionGlobal: () => {},
});

type GlobalStateProviderProps = {
  children: React.ReactNode;
};

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { startTransition } = pixelTransition();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 1000px)").matches);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    setCurrentPage(-1);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const updatePage = (page: number) => {
    if (page === currentPage) {
      return;
    } else {
      setCurrentPage(page);
      startTransition(page);
    }
  };

  return (
    <GlobalStateContext.Provider
      value={{ isMobile, currentPage, startTransitionGlobal: updatePage }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
