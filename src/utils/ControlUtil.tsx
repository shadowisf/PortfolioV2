import { createContext, useContext, useEffect, useState } from "react";
import { navBarAnimation } from "./AnimationUtils";
import { resetTheme } from "./ColorUtils";

type GlobalStateContextType = {
  isMobile: boolean;
  currentPage: number;
  setCurrentPage: (val: number) => void;
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
  setCurrentPage: () => {},
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

  // reset entire theme
  const executeResetTheme = () => {
    setIsCustomTheme(false);
    resetTheme(textColor, backgroundColor, accentColor, fadedColor);

    closeMenu(() => {});
  };

  return (
    <GlobalStateContext.Provider
      value={{
        isMobile,
        currentPage,
        setCurrentPage,
        isCustomTheme,
        setIsCustomTheme,
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
