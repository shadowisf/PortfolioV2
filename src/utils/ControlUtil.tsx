import { createContext, useContext, useEffect, useState } from "react";
import { pixelTransition } from "./AnimationUtils";

type GlobalStateContextType = {
  isMobile: boolean;
  currentPage: number;
  startTransitionGlobal: (page: number, skipStart?: boolean) => void;
};

type GlobalStateProviderProps = {
  children: React.ReactNode;
};

// default values
const GlobalStateContext = createContext<GlobalStateContextType>({
  isMobile: false,
  currentPage: 0,
  startTransitionGlobal: () => {},
});

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(-1);
  const { startTransition, endTransition, changePage } = pixelTransition();

  useEffect(() => {
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleResize() {
    setIsMobile(window.matchMedia("(max-width: 1000px)").matches);
    window.addEventListener("resize", handleResize);
  }

  // pixel transition w/ page update
  const executeSummary = (page: number, skipStart?: boolean) => {
    if (page === currentPage) {
      return;
    } else if (skipStart) {
      setCurrentPage(page);
      changePage(page);
      endTransition();
    } else {
      setCurrentPage(page);
      startTransition(() => {
        changePage(page);
        endTransition();
      });
    }
  };

  return (
    <GlobalStateContext.Provider
      value={{
        isMobile,
        currentPage,
        startTransitionGlobal: executeSummary,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
