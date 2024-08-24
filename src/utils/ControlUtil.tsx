import { useGSAP } from "@gsap/react";
import { createContext, useContext, useEffect, useState } from "react";
import { pixelTransition, scrollingAnimation } from "./AnimationUtils";
import { useNavigate } from "react-router-dom";

type GlobalStateContextType = {
  isMobile: boolean;
  currentPage: string;
  setCurrentPage: (url: string) => void;
  executeTransition: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    url: string,
    skipStart: boolean
  ) => void;
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
  const { scrollToTop } = scrollingAnimation();
  const minMaxWidth = getComputedStyle(document.documentElement)
    .getPropertyValue("--minMaxWidth")
    .trim();

  useEffect(() => {
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // handle window resize, set mobile state
  function handleResize() {
    setIsMobile(window.matchMedia(`(max-width: ${minMaxWidth})`).matches);
    window.addEventListener("resize", handleResize);
  }

  // execute page transition
  const executeTransition = contextSafe(
    (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      url: string,
      skipStart?: boolean
    ) => {
      event.preventDefault();
      if (currentPage === url && !isMobile) {
        return;
      } else if (currentPage === url && isMobile) {
        closeMenu();
      } else if (skipStart === true) {
        navigate(url);
        closeMenu();
      } else {
        startTransition(() => {
          navigate(url);
          endTransition();
        });
      }
    }
  );

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
