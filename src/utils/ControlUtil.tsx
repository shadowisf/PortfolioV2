import { createContext, useContext, useEffect, useState } from "react";
import { pixelTransition } from "../components/PixelGrid";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface GlobalStateContextType {
  isMobile: boolean;
  currentPage: number;
  startTransitionGlobal: (page: number, skipStart?: boolean) => void;
}

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
  const [currentPage, setCurrentPage] = useState(-1);

  const { startTransition, endTransition } = pixelTransition();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 1000px)").matches);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { contextSafe } = useGSAP();

  const changePage = contextSafe((id: number) => {
    const allPages = document.querySelectorAll("main[data-key]");

    allPages.forEach((page) => {
      const dataKey = page.getAttribute("data-key");

      switch (dataKey) {
        case "-1": // home
          gsap.set(allPages, {
            display: "none",
          });
          gsap.set(page, { display: "flex" });
          break;
        case id.toString():
          gsap.set(allPages, { display: "none" });
          gsap.set(page, { display: "block" });
          break;
        default:
      }
    });
  });

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
