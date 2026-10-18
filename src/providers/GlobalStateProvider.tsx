import { useGSAP } from "@gsap/react";
import { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import faviconLight from "../favicons/favicon-light.svg";
import faviconDark from "../favicons/favicon-dark.svg";
// files of their own, not inlined as data urls -- a precaution for safari,
// which is choosier about its tab icons than chromium
import faviconLightPng from "../favicons/favicon-light.png?no-inline";
import faviconDarkPng from "../favicons/favicon-dark.png?no-inline";

type GlobalStateContextType = {
  isMobile: boolean;
  currentPage: string;
  setCurrentPage: (url: string) => void;
  executeTransition: (url: string, keepMenu?: boolean) => void;
  handleToggleTheme: () => void;
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
  // Read straight away rather than starting empty: with "" the first render
  // drew the toggle for the wrong theme, and correcting it a moment later
  // played the sun/moon morph on every page load.
  const [userTheme, setUserTheme] = useState(
    () =>
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );
  const [currentPage, setCurrentPage] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  const { contextSafe } = useGSAP();

  const navigate = useNavigate();

  const minMaxWidth = getComputedStyle(document.documentElement)
    .getPropertyValue("--minMaxWidth")
    .trim();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // widening past the mobile layout takes the menu with it
  useEffect(() => {
    if (!isMobile && hasMounted) {
      setInMenu(false);
    }
  }, [isMobile, hasMounted]);

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

    // flip every colour in one frame -- see .themeSwitching in main.scss
    const root = document.documentElement;
    root.classList.add("themeSwitching");
    root.style.setProperty("--theme", theme);
    // reading a computed style forces the new colours to resolve while
    // transitions are still off, so removing the class cannot replay them
    void getComputedStyle(root).color;
    window.setTimeout(() => root.classList.remove("themeSwitching"), 0);

    // the browser's own top bar takes the nav bar's shade, so the two join up
    if (theme === "dark") {
      themeColorMetaTag?.setAttribute("content", "rgb(44, 44, 46)");
    }

    if (theme === "light") {
      themeColorMetaTag?.setAttribute("content", "rgb(242, 242, 242)");
    }

    // And the tab's icon is drawn for the site's theme rather than the
    // system's (favicon.svg's own, until this runs): the svg for chromium
    // and firefox, and in the .ico's place a png of the same, which is what
    // safari reads. Each a new link in the old one's place, its address
    // made new, since browsers do not all look again at a changed href.
    const icons: [string, string][] = [
      ['link[rel="icon"][type="image/svg+xml"]', theme === "dark" ? faviconDark : faviconLight],
      ['link[rel="icon"]:not([type="image/svg+xml"])', theme === "dark" ? faviconDarkPng : faviconLightPng],
    ];
    icons.forEach(([selector, href]) => {
      const icon = document.querySelector(selector);
      if (!icon) return;
      const next = icon.cloneNode() as HTMLLinkElement;
      next.href = href.startsWith("data:")
        ? href
        : `${href}${href.includes("?") ? "&" : "?"}theme=${theme}`;
      if (!next.type) next.type = "image/png";
      icon.replaceWith(next);
    });
  }, [userTheme]);

  // The theme toggle. The page crossfades from one theme to the other as a
  // whole (a view transition): the browser holds a picture of it in the old
  // colours, flips them underneath in one frame (.themeSwitching), and fades
  // the picture out over the page in the new -- so everything changes
  // together, images, blur and all, with the sun and moon morphing live
  // beneath. Where a browser has no view transitions, the flip is simply
  // instant. Like the site's other chosen motion, it plays with reduced
  // motion on.
  function handleToggleTheme() {
    const newTheme = userTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);

    // rendered, and the colours applied (the effect above), before the
    // browser takes the new picture
    const flip = () => flushSync(() => setUserTheme(newTheme));
    if ("startViewTransition" in document) document.startViewTransition(flip);
    else flip();
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
  // keepMenu: the mobile menu left open, for it to close itself once the
  // new page is in (NavBar)
  const executeTransition = contextSafe((url: string, keepMenu = false) => {
    // the mobile menu goes up either way, if it was open
    if (!keepMenu) setInMenu(false);
    if (url === currentPage) return;

    navigate(url);
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
