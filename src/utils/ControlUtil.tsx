import { useGSAP } from "@gsap/react";
import { createContext, useContext, useEffect, useState } from "react";
import { pageTransition } from "./AnimationUtils";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

gsap.registerPlugin(gsap, useGSAP);

type GlobalStateContextType = {
  isMobile: boolean;
  currentPage: string;
  setCurrentPage: (url: string) => void;
  executeTransition: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent> | null,
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

export function useGlobalState() {
  return useContext(GlobalStateContext);
}

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const { contextSafe } = useGSAP();
  const { closeMenu, startTransition, endTransition } = pageTransition();
  const navigate = useNavigate();

  const minMaxWidth = getComputedStyle(document.documentElement)
    .getPropertyValue("--minMaxWidth")
    .trim();

  useEffect(() => {
    handleResize();
  }, [currentPage]);

  // handle window resize, set mobile state
  function handleResize() {
    gsap.matchMedia().add(`(max-width: ${minMaxWidth})`, () => {
      setIsMobile(true);
    });
    gsap.matchMedia().add(`(min-width: ${minMaxWidth})`, () => {
      setIsMobile(false);
    });
  }

  // execute page transition
  const executeTransition = contextSafe(
    (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent> | null,
      url: string,
      skipStart?: boolean
    ) => {
      event?.preventDefault();

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

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
