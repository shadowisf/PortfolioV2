import { useGSAP } from "@gsap/react";
import { createContext, useContext, useEffect, useState } from "react";
import { pixelTransition } from "./AnimationUtils";
import { useNavigate } from "react-router-dom";

type GlobalStateContextType = {
  isMobile: boolean;
  currentPage: string;
  setCurrentPage: (url: string) => void;
  executeTransition: (url: string, skipStart: boolean) => void;
};

type GlobalStateProviderProps = {
  children: React.ReactNode;
};

// default values
const GlobalStateContext = createContext<GlobalStateContextType>({
  isMobile: false,
  currentPage: "",
  setCurrentPage: () => {},
  executeTransition: () => {},
});

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const { contextSafe } = useGSAP();
  const { closeMenu, startTransition, endTransition } = pixelTransition();
  const navigate = useNavigate();

  useEffect(() => {
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // handle window resize, set mobile state
  function handleResize() {
    setIsMobile(window.matchMedia("(max-width: 1000px)").matches);
    window.addEventListener("resize", handleResize);
  }

  // execute page transition
  const executeTransition = contextSafe((url: string, skipStart?: boolean) => {
    if (currentPage === url && !isMobile) {
      return;
    } else if (currentPage && isMobile) {
      closeMenu();
    } else if (skipStart) {
      navigate(url);
      closeMenu();
    } else {
      startTransition(() => {
        navigate(url);
        endTransition();
      });
    }
  });

  return (
    <GlobalStateContext.Provider
      value={{
        isMobile,
        currentPage,
        setCurrentPage,
        executeTransition,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
