import { createContext, useContext, useEffect, useState } from "react";

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
});

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [isMobile, setIsMobile] = useState(false);

  const [currentPage, setCurrentPage] = useState(-1);

  // theme states
  const [isCustomTheme, setIsCustomTheme] = useState(false);
  const [textColor, setTextColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [fadedColor, setFadedColor] = useState("");

  useEffect(() => {
    handleResize();

    setThemeColors();

    return () => {
      window.removeEventListener("resize", handleResize);
      setTextColor("");
      setBackgroundColor("");
      setAccentColor("");
      setFadedColor("");
    };
  }, []);

  // handle window resize, set mobile state
  function handleResize() {
    setIsMobile(window.matchMedia("(max-width: 1000px)").matches);
    window.addEventListener("resize", handleResize);
  }

  // set theme colors for reset theme buttons
  function setThemeColors() {
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
  }

  return (
    <GlobalStateContext.Provider
      value={{
        isMobile,
        currentPage,
        setCurrentPage,
        isCustomTheme,
        setIsCustomTheme,
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
