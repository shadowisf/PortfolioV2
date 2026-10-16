import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { ThemeIcon } from "./ThemeIcon";
import { LogoMark } from "./LogoMark";
import { MenuIcon } from "./MenuIcon";
import { workMapping } from "../utils/workMapping";
import { upcomingWork } from "../utils/upcomingWork";

// The flyout's columns, in this order, each under a short heading. A type with
// no projects simply gets no column.
const workGroups = [
  { type: "professional experience", label: "professional" },
  { type: "freelance project", label: "freelance" },
  { type: "startup project", label: "startup" },
  { type: "personal project", label: "personal" },
];

// newest first within each column, the same order as the old dropdown
const workColumns = workGroups
  .map(({ type, label }) => ({
    label,
    // still to come: shown at the head of their column, greyed out
    upcoming: upcomingWork.filter((project) => project.type === type),
    projects: Object.keys(workMapping)
      .reverse()
      .map((id) => ({ id, project: workMapping[Number(id)] }))
      .filter(({ project }) => project.type === type)
      .map(({ id, project }) => ({
        id,
        project,
        title: project.name.replace(/\s+/g, "-"),
      })),
  }))
  .filter((column) => column.upcoming.length + column.projects.length > 0);

// Hover intent. A cursor sweeping across the bar on its way to something else
// should not drop the panel, and one moving from "work" down into the panel
// crosses a strip of bar on the way, which must not close it.
const OPEN_DELAY_MS = 80;
const CLOSE_DELAY_MS = 150;
// a link followed from the drawer or the mobile menu: how long the new page
// shows under it before it slides back up
const NEW_PAGE_HOLD_MS = 250;

export default function NavBar() {
  const {
    executeTransition,
    userTheme,
    handleToggleTheme,
    inMenu,
    setInMenu,
    currentPage,
    isMobile,
  } = useGlobalState();

  // The page holds still under the open menu: pinned where it was, and put
  // back there when the menu closes. (Hiding the overflow alone does not stop
  // a phone's touch scrolling, on ios least of all.)
  // A link followed from it leaves the page for another, which starts at
  // its top: there is nowhere to put back to (leftPage).
  const leftPage = useRef(false);
  useEffect(() => {
    if (!inMenu) return;
    const y = window.scrollY;
    const body = document.body.style;
    const before = { position: body.position, top: body.top, width: body.width, overflow: body.overflow };
    Object.assign(body, { position: "fixed", top: `-${y}px`, width: "100%", overflow: "hidden" });
    return () => {
      Object.assign(body, before);
      window.scrollTo(0, leftPage.current ? 0 : y);
      leftPage.current = false;
    };
  }, [inMenu]);

  // closed, the menu is clipped out of view but still in the page: out of the
  // tab order and the accessibility tree with it; and escape closes it
  const menu = useRef<HTMLDivElement | null>(null);
  const menuButton = useRef<HTMLButtonElement | null>(null);
  // When a link in it is followed, the logo plays back to its plain self
  // there and then (logoStopped), while the menu is still open over the new
  // page. logoInstant puts it straight back instead, unplayed -- the current
  // page's own link.
  const [logoInstant, setLogoInstant] = useState(false);
  const [logoStopped, setLogoStopped] = useState(false);
  // The menu's work accordion: as the menu opens, open on a project's page
  // (its project marked inside) and closed anywhere else -- already so, not
  // sliding open as the menu comes down (workListInstant, until it is next
  // tapped). Closed, its projects are out of the tab order and the
  // accessibility tree.
  const [workListOpen, setWorkListOpen] = useState(false);
  const [workListInstant, setWorkListInstant] = useState(false);
  const workList = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (workList.current) workList.current.inert = !workListOpen;
  }, [workListOpen]);

  // the menu's panel rounded up to a whole pixel, as the drawer's is: a
  // lower edge part-way through a pixel blends with the blur beneath into a
  // line along it
  const menuPanel = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const panel = menuPanel.current;
    if (!panel) return;
    const measure = () => {
      panel.style.minHeight = "";
      panel.style.minHeight = `${Math.ceil(panel.getBoundingClientRect().height)}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(panel.firstElementChild ?? panel);
    return () => observer.disconnect();
  }, []);
  // A link followed from the menu: the new page comes in under it, still
  // open over the blur, and a moment later the menu closes as the
  // menu button closes it (closeAfterPage) -- the logo playing back from
  // the moment the link is followed. The current page's own link just
  // closes it.
  const closeAfterPage = useRef(false);
  function goFromMenu(url: string) {
    // (the bar's logo, with the menu shut: just the new page)
    if (!inMenu) return executeTransition(url);
    if (url === currentPage) {
      setLogoInstant(true);
      setInMenu(false);
      return;
    }
    closeAfterPage.current = true;
    leftPage.current = true;
    setLogoStopped(true);
    // the new page laid out from its top under the menu, not where the old
    // one was scrolled to
    document.body.style.top = "0px";
    executeTransition(url, true);
  }
  useEffect(() => {
    if (menu.current) menu.current.inert = !inMenu;
    if (!inMenu) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setInMenu(false);
      menuButton.current?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inMenu]);

  const [workOpen, setWorkOpen] = useState(false);
  // The desktop logo while the drawer is down: written out and morphing by
  // itself, as the mobile one does under its menu, and played back once the
  // drawer goes -- or from the moment a project in it is clicked (drawerLeft),
  // while the drawer waits over the new page.
  const [drawerLeft, setDrawerLeft] = useState(false);
  useEffect(() => {
    if (workOpen) setDrawerLeft(false);
  }, [workOpen]);
  // set when a project is clicked: the panel vanishes rather than sliding back
  // up over the page that is replacing it
  const [workInstant, setWorkInstant] = useState(false);
  const workTimer = useRef<number | null>(null);
  const workTrigger = useRef<HTMLButtonElement | null>(null);
  const workPanel = useRef<HTMLDivElement | null>(null);

  // one timer for both directions, so a pending close is cancelled by a
  // re-entry and a pending open by a quick exit
  function scheduleWork(open: boolean) {
    if (workTimer.current !== null) window.clearTimeout(workTimer.current);
    workTimer.current = window.setTimeout(
      () => {
        if (open) setWorkInstant(false);
        setWorkOpen(open);
      },
      open ? OPEN_DELAY_MS : CLOSE_DELAY_MS
    );
  }

  function setWorkNow(open: boolean, instant = false) {
    if (workTimer.current !== null) window.clearTimeout(workTimer.current);
    workTimer.current = null;
    setWorkInstant(instant);
    setWorkOpen(open);
  }

  // the layout dropping to the mobile nav closes the drawer at once
  useEffect(() => {
    if (workTimer.current !== null) window.clearTimeout(workTimer.current);
    workTimer.current = null;
    setWorkOpen(false);
  }, [isMobile]);

  // A new page: the drawer, and the mobile menu if a link in it was
  // followed, stay open over it for NEW_PAGE_HOLD_MS, the page loaded in
  // beneath, and then slide back up.
  useEffect(() => {
    const hold = window.setTimeout(() => {
      if (workTimer.current !== null) window.clearTimeout(workTimer.current);
      workTimer.current = null;
      setWorkInstant(false);
      setWorkOpen(false);
      if (closeAfterPage.current) {
        closeAfterPage.current = false;
        setInMenu(false);
      }
    }, NEW_PAGE_HOLD_MS);
    return () => window.clearTimeout(hold);
    // only a change of page sets it going
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    return () => {
      if (workTimer.current !== null) window.clearTimeout(workTimer.current);
    };
  }, []);

  // closed, the links are still in the page (they are only clipped out of
  // view), so take them out of the tab order and the accessibility tree too
  useEffect(() => {
    if (workPanel.current) workPanel.current.inert = !workOpen;
  }, [workOpen]);

  // The panel rounded up to a whole pixel: left at its natural height
  // (303.58px, say) its lower edge fell part-way through a pixel, and that
  // half-covered row blended with the blur beneath into a line along the edge.
  useEffect(() => {
    const panel = workPanel.current;
    const inner = panel?.querySelector<HTMLElement>(".workFlyoutInner");
    if (!panel || !inner) return;
    const measure = () => {
      inner.style.minHeight = "";
      inner.style.minHeight = `${Math.ceil(inner.getBoundingClientRect().height)}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!workOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setWorkNow(false);
      workTrigger.current?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [workOpen]);


  // which section of the bar you are in: any project page counts as "work"
  const onWork = workColumns.some((column) =>
    column.projects.some(({ title }) => title === currentPage)
  );
  const onAbout = currentPage === "about";

  return (
    <>
      {/* desktop nav */}
      <div
        className="navAlt"
      >
        <Link
          to="/"
          className="logoButton alt"
          aria-label="home"
          onClick={(e) => {
            e.preventDefault();
            executeTransition("/");
          }}
        >
          <LogoMark auto={workOpen && !drawerLeft} />
        </Link>

        <span className="navButtons alt">
          {/* a click opens it too, for keyboards and touch; it never closes
              it, or a mouse that had already opened it by hovering would
              shut it again by clicking */}
          <button
            ref={workTrigger}
            className={`workTrigger${workOpen ? " open" : ""}${onWork ? " active" : ""}`}
            aria-expanded={workOpen}
            aria-controls="workFlyout"
            onMouseEnter={() => scheduleWork(true)}
            onMouseLeave={() => scheduleWork(false)}
            onClick={() => setWorkNow(true)}
          >
            work
          </button>

          <Link
            to="about"
            className={onAbout ? "active" : undefined}
            aria-current={onAbout ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              executeTransition("about");
            }}
          >
            about
          </Link>

          <button
            onClick={handleToggleTheme}
            className="themeButton"
            aria-label="toggle theme"
          >
            <ThemeIcon dark={userTheme === "dark"} size={24} />
          </button>
        </span>
      </div>

      {/* the work flyout, pulled down from under the bar */}
      <div
        id="workFlyout"
        ref={workPanel}
        className={`workFlyout${workOpen ? " open" : ""}${workInstant ? " instant" : ""}`}
        onMouseEnter={() => scheduleWork(true)}
        onMouseLeave={() => scheduleWork(false)}
      >
        <div className="workFlyoutInner">
          {workColumns.map((column) => (
            <section className="workFlyoutColumn" key={column.label}>
              <small className="workFlyoutHeading">{column.label}</small>
              <ul>
                {column.upcoming.map(({ name }) => (
                  <li key={name}>
                    <span className="upcoming" aria-disabled="true">
                      <span className="workFlyoutName">{name}</span>
                      <small className="workFlyoutYear">soon</small>
                    </span>
                  </li>
                ))}
                {column.projects.map(({ id, project, title }) => (
                  // the name alone is the link: not the year, nor the
                  // space between
                  <li key={id}>
                    <Link
                      to={`/${title}`}
                      className={`workFlyoutName${title === currentPage ? " active" : ""}`}
                      aria-current={title === currentPage ? "page" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        // the drawer stays down over the new page until it
                        // is in; on this project's own page, it just closes
                        if (title === currentPage) return setWorkNow(false);
                        setDrawerLeft(true);
                        executeTransition(title);
                      }}
                    >
                      {project.name}
                    </Link>
                    <small className="workFlyoutYear">{project.year}</small>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      {/* Blurs the whole page, behind the panel as well as below it; a
          click on it closes the panel. One unbroken sheet of blur, its top
          edge off at the top of the screen, never at the panel's. */}
      <div
        className={`workFlyoutScrim${workOpen ? " open" : ""}${workInstant ? " instant" : ""}`}
        onClick={() => setWorkNow(false)}
        aria-hidden="true"
      />

      {/* mobile nav: no hover here, so the logo writes and morphs by itself,
          while the menu is open */}
      <nav>
        <Link
          to="/"
          className="logoButton"
          aria-label="home"
          onClick={(e) => {
            e.preventDefault();
            goFromMenu("/");
          }}
        >
          <LogoMark auto playing={inMenu && !logoStopped} instant={logoInstant} />
        </Link>

        <span className="navButtons">
          <div className="selectContainer">
            <label htmlFor="workSelect" className="hidden">
              choose work
            </label>
            <select
              id="workSelect"
              onChange={(e) => executeTransition(e.target.value)}
              value={"work"}
            >
              <option value={"work"} disabled>
                work
              </option>
              {Object.keys(workMapping)
                .reverse()
                .map((id) => {
                  const project = workMapping[Number(id)];
                  const title = project.name.replace(/\s+/g, "-");
                  return (
                    <option key={id} value={title}>
                      {project.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <Link to="about">about</Link>

          <button
            aria-label="toggle theme"
            onClick={handleToggleTheme}
            className="themeButton"
          >
            <ThemeIcon dark={userTheme === "dark"} size={24} />
          </button>
        </span>

        {/* opens the menu and, a cross while it is open, closes it */}
        <button
          ref={menuButton}
          aria-label={inMenu ? "close menu" : "open menu"}
          aria-expanded={inMenu}
          aria-controls="mobileMenu"
          className="hamburgerButton"
          onClick={() => {
            setLogoInstant(false);
            setLogoStopped(false);
            if (!inMenu) {
              setWorkListInstant(true);
              setWorkListOpen(onWork);
            }
            setInMenu(!inMenu);
          }}
        >
          <MenuIcon open={inMenu} />
        </button>
      </nav>

      {/* the page blurred under the mobile menu, as under the work drawer;
          a tap on it closes the menu */}
      <div
        className={`menuScrim${inMenu ? " open" : ""}`}
        onClick={() => setInMenu(false)}
        aria-hidden="true"
      />

      {/* The mobile menu, pulled down from under the bar (see .menu). Its
          contents ride down on the panel, already in place. Left-aligned
          like the rest of the site -- about; then work, its projects by kind
          with their years, as in the desktop drawer; and the theme at the
          foot, on the right. */}
      <div
        id="mobileMenu"
        ref={menu}
        className={`menu${inMenu ? " open" : ""}`}
      >
        <div className="menuPanel" ref={menuPanel}>
          <div className="menuLinks">
            <Link
              to="about"
              className={`menuHeading${onAbout ? " active" : ""}`}
              aria-current={onAbout ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                goFromMenu("about");
              }}
            >
              about
            </Link>

            {/* an accordion: "work" opens its projects below it, and closes
                them again */}
            <section className="menuWork">
              <button
                className={`menuHeading menuToggle${onWork ? " active" : ""}${workListOpen ? " open" : ""}${workListInstant ? " instant" : ""}`}
                aria-expanded={workListOpen}
                aria-controls="menuWorkList"
                onClick={() => {
                  setWorkListInstant(false);
                  setWorkListOpen(!workListOpen);
                }}
              >
                {/* its own span, so the page marker follows the word and
                    not the chevron at the far end */}
                <span className="menuToggleLabel">work</span>
                <svg className="menuChevron" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                id="menuWorkList"
                ref={workList}
                className={`menuWorkList${workListOpen ? " open" : ""}${workListInstant ? " instant" : ""}`}
              >
                <div className="menuWorkInner">
                  <div className="menuWorkGroups">
                    {workColumns.map((column) => (
                      <div className="menuGroup" key={column.label}>
                        <small className="menuGroupLabel">{column.label}</small>
                        <ul>
                          {column.upcoming.map(({ name }) => (
                            <li key={name}>
                              <span className="menuProject upcoming" aria-disabled="true">
                                <span className="menuName">{name}</span>
                                <small className="menuYear">soon</small>
                              </span>
                            </li>
                          ))}
                          {column.projects.map(({ id, project, title }) => (
                            // the name alone is the link: not the year,
                            // nor the space between
                            <li key={id} className="menuProject">
                              <Link
                                to={`/${title}`}
                                className={`menuName${title === currentPage ? " active" : ""}`}
                                aria-current={title === currentPage ? "page" : undefined}
                                onClick={(e) => {
                                  e.preventDefault();
                                  goFromMenu(title);
                                }}
                              >
                                {project.name}
                              </Link>
                              <small className="menuYear">{project.year}</small>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <button
            // the theme changes and the menu stays open
            onClick={handleToggleTheme}
            className="themeButton menuFoot"
          >
            <ThemeIcon dark={userTheme === "dark"} size={24} />
            <span>{userTheme === "dark" ? "dark" : "light"}</span>
          </button>
        </div>
      </div>
    </>
  );
}
