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
  handleToggleTheme: (menu: boolean) => void;
  userTheme: string;
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
});

export function useGlobalState() {
  return useContext(GlobalStateContext);
}

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [userTheme, setUserTheme] = useState("");
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
        closeMenu(false);
      } else if (skipStart === true) {
        navigate(url);
        closeMenu(false);
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
        handleToggleTheme,
        userTheme,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
