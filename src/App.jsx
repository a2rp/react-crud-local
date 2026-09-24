import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdArrowUpward, MdMenuOpen } from "react-icons/md";
import { TbSunMoon } from "react-icons/tb";
import Footer from "./components/footer";
import NavList from "./components/navList";
import AppRoutes from "./AppRoutes";
import Breadcrumbs from "./components/Breadcrumbs";
import ScrollToTop from "./components/ScrollToTop";
import Styled from "./App.styled";

const THEME_KEY = "theme";

const getInitialTheme = () => {
    try {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === "light" || saved === "dark") return saved;
    } catch {
        // Continue with the system preference.
    }
    return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const App = () => {
    const [displayNav, setDisplayNav] = useState(true);
    const [theme, setTheme] = useState(getInitialTheme);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        try { localStorage.setItem(THEME_KEY, theme); } catch { /* Preference is optional. */ }
    }, [theme]);

    useEffect(() => {
        const content = contentRef.current;
        if (!content) return undefined;
        const handleScroll = () => setShowScrollTop(content.scrollTop > 180);
        handleScroll();
        content.addEventListener("scroll", handleScroll);
        return () => content.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Styled.Wrapper>
            <Styled.Header>
                <Styled.LogoLinkWrapper>
                    <Styled.NavLinkWrapper
                        type="button"
                        onClick={() => setDisplayNav((value) => !value)}
                        title={displayNav ? "Hide navigation" : "Show navigation"}
                        aria-label={displayNav ? "Hide navigation" : "Show navigation"}
                    >
                        <MdMenuOpen size={21} aria-hidden="true" />
                    </Styled.NavLinkWrapper>
                    <NavLink to="/" title="React CRUD Local home">
                        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ashish Ranjan logo" />
                        <span><small>LOCAL WORKSPACE</small>React CRUD Local</span>
                    </NavLink>
                </Styled.LogoLinkWrapper>
                <Styled.Heading>
                    <span className="status">Browser storage</span>
                    <button
                        className="themeToggle"
                        type="button"
                        title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                        onClick={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
                    >
                        <TbSunMoon aria-hidden="true" />
                    </button>
                </Styled.Heading>
            </Styled.Header>

            <Styled.Main>
                <Styled.NavWrapper className={displayNav ? "active" : ""}>
                    <div className="navInner"><NavList /></div>
                </Styled.NavWrapper>
                <Styled.ContentWrapper id="scroll-root" ref={contentRef}>
                    <Styled.RoutesWrapper>
                        <Breadcrumbs />
                        <AppRoutes />
                    </Styled.RoutesWrapper>
                    <Styled.Footer><Footer /></Styled.Footer>
                </Styled.ContentWrapper>
            </Styled.Main>

            {showScrollTop && (
                <Styled.ScrollTopBtn type="button" onClick={() => contentRef.current?.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top" title="Scroll to top">
                    <MdArrowUpward size={20} aria-hidden="true" />
                </Styled.ScrollTopBtn>
            )}
            <ScrollToTop />
        </Styled.Wrapper>
    );
};

export default App;
