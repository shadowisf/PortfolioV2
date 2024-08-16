import { createContext, useContext, useEffect, useState } from "react";
import {
  navBarAnimation,
  pixelTransition,
  scrollingAnimation,
} from "./AnimationUtils";
import { resetTheme } from "./ColorUtils";

type GlobalStateContextType = {
  isMobile: boolean;
  currentPage: number;
  startTransitionGlobal: (page: number, skipStart?: boolean) => void;
  isCustomTheme: boolean;
  setIsCustomTheme: (val: boolean) => void;
  textColor: string;
  backgroundColor: string;
  accentColor: string;
  fadedColor: string;
  resetThemeGlobal: () => void;
};

type GlobalStateProviderProps = {
  children: React.ReactNode;
};

// default values
const GlobalStateContext = createContext<GlobalStateContextType>({
  isMobile: false,
  currentPage: 0,
  startTransitionGlobal: () => {},
  isCustomTheme: false,
  setIsCustomTheme: () => {},
  textColor: "",
  backgroundColor: "",
  accentColor: "",
  fadedColor: "",
  resetThemeGlobal: () => {},
});

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isCustomTheme, setIsCustomTheme] = useState(false);
  const [currentPage, setCurrentPage] = useState(-1);
  const { startTransition, endTransition, changePage } = pixelTransition();
  const { scrollToTop } = scrollingAnimation();
  const [textColor, setTextColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [fadedColor, setFadedColor] = useState("");
  const { closeMenu } = navBarAnimation();

  useEffect(() => {
    handleResize();

    setTextColor(
      document.documentElement.style.getPropertyValue("--text-color")
    );
    setBackgroundColor(
      document.documentElement.style.getPropertyValue("--background-color")
    );
    setAccentColor(
      document.documentElement.style.getPropertyValue("--accent-color")
    );
    setFadedColor(
      document.documentElement.style.getPropertyValue("--faded-color")
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      setTextColor("");
      setBackgroundColor("");
      setAccentColor("");
      setFadedColor("");
    };
  }, []);

  // handle window resize
  function handleResize() {
    setIsMobile(window.matchMedia("(max-width: 1000px)").matches);
    window.addEventListener("resize", handleResize);
  }

  // pixel transition w/ page update
  const executePixelTransition = (page: number, skipStart?: boolean) => {
    if (page === currentPage) {
      return;
    } else if (skipStart) {
      setCurrentPage(page);
      scrollToTop(0);
      changePage(page);
      endTransition();
    } else {
      setCurrentPage(page);
      startTransition(() => {
        scrollToTop(0);
        changePage(page);
        endTransition();
      });
    }
  };

  // reset entire theme
  const executeResetTheme = () => {
    setIsCustomTheme(false);
    resetTheme(textColor, backgroundColor, accentColor, fadedColor);

    closeMenu();
  };

  return (
    <GlobalStateContext.Provider
      value={{
        isMobile,
        currentPage,
        isCustomTheme,
        setIsCustomTheme,
        startTransitionGlobal: executePixelTransition,
        resetThemeGlobal: executeResetTheme,
        textColor,
        backgroundColor,
        accentColor,
        fadedColor,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
