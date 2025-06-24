import { useGSAP } from "@gsap/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { usePageTransition } from "../utils/gsap/usePageTransition";

type GlobalStateContextType = {
  isMobile: boolean;
  currentPage: string;
  setCurrentPage: (url: string) => void;
  executeTransition: (url: string, skipStart: boolean) => void;
  handleToggleTheme: (menu: boolean) => void;
  userTheme: string;
  inMenu: boolean;
  setInMenu: (value: boolean) => void;
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
  handleToggleTheme: () => {},
  userTheme: "",
  inMenu: false,
  setInMenu: () => {},
});

export function useGlobalState() {
  return useContext(GlobalStateContext);
}

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [inMenu, setInMenu] = useState(false);
  const [userTheme, setUserTheme] = useState("");
  const [currentPage, setCurrentPage] = useState("");

  const { contextSafe } = useGSAP();
  const { closeMenu /* , startTransition, endTransition */ } =
    usePageTransition();

  const navigate = useNavigate();

  const minMaxWidth = getComputedStyle(document.documentElement)
    .getPropertyValue("--minMaxWidth")
    .trim();

  useEffect(() => {
    handleResize();
  }, [currentPage]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const theme = savedTheme || systemTheme;
    const themeColorMetaTag = document.querySelector(
      'meta[name="theme-color"]'
    );

    setUserTheme(theme);

    document.documentElement.style.setProperty("--theme", theme);

    if (theme === "dark") {
      themeColorMetaTag?.setAttribute("content", "rgb(28, 28, 30)");
    }

    if (theme === "light") {
      themeColorMetaTag?.setAttribute("content", "rgb(229, 229, 234)");
    }
  }, [userTheme]);

  // handle theme toggle
  function handleToggleTheme(menu: boolean) {
    const newTheme = userTheme === "dark" ? "light" : "dark";

    setUserTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    if (menu) {
      closeMenu(false);
    }
  }

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
  const executeTransition = contextSafe((url: string, skipStart?: boolean) => {
    if (currentPage === url && !isMobile) {
      return;
    } else if (currentPage === url && isMobile) {
      closeMenu(false);
    } else if (skipStart === true) {
      navigate(url);
      closeMenu(false);
    } else {
      navigate(url);
    }
  });

  return (
    <GlobalStateContext.Provider
      value={{
        isMobile,
        currentPage,
        setCurrentPage,
        executeTransition,
        handleToggleTheme,
        userTheme,
        inMenu,
        setInMenu,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}
