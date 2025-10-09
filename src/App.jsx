import ScrollToTop from './components/ScrollToTop';
import Styled from './App.styled';
import { Route, Routes, NavLink } from 'react-router-dom';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { MdArrowUpward, MdMenuOpen } from 'react-icons/md';
import { TbSunMoon } from 'react-icons/tb';
import { IoNotificationsCircleSharp } from 'react-icons/io5';
import { CiSettings } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa';
import { Box, CircularProgress } from '@mui/material';
import Footer from './components/footer';
import NavList from './components/navList';
import AppRoutes from './AppRoutes';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import Breadcrumbs from "./components/Breadcrumbs";
// --- Simple placeholder for design-only routes (replace with real pages later) ---
const Placeholder = ({ title }) => (
    <div className="pagePlaceholder">
        <h2>{title}</h2>
        <p>
            This is a design-only placeholder page for <b>{title}</b>. Replace with the real component when ready.
        </p>
    </div>
);

// --- Theme handling ---
const THEME_KEY = 'theme'; // 'dark' | 'light'
const getInitialTheme = () => {
    try {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === 'light' || saved === 'dark') return saved;
    } catch { }
    // fall back to OS preference
    if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
};

const App = () => {
    const [displayNav, setDisplayNav] = useState(true);
    const handleDisplayNav = () => setDisplayNav(prev => !prev);

    // ↑ Scroll-to-top state + ref
    const contentRef = useRef(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Theme state
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const onScroll = () => setShowScrollTop(el.scrollTop > 100);
        onScroll();
        el.addEventListener('scroll', onScroll);
        return () => el.removeEventListener('scroll', onScroll);
    }, []);

    // Apply theme on html[data-theme]
    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        try { localStorage.setItem(THEME_KEY, theme); } catch { }
    }, [theme]);

    const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

    const scrollToTop = () => {
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Styled.Wrapper>
            <Styled.Header>
                <Styled.LogoLinkWrapper>
                    <Styled.NavLinkWrapper onClick={handleDisplayNav} title="Toggle Navigation">
                        <MdMenuOpen size={20} />
                    </Styled.NavLinkWrapper>
                    <NavLink to="/" title="React CRUD Local">React CRUD Local</NavLink>
                </Styled.LogoLinkWrapper>

                <Styled.Heading>
                    <div
                        className="themeToggle"
                        title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
                        role="button"
                        aria-pressed={theme === 'light' ? 'true' : 'false'}
                        onClick={toggleTheme}
                    >
                        <TbSunMoon />
                    </div>
                </Styled.Heading>
            </Styled.Header>

            <Styled.Main>
                <Styled.NavWrapper className={displayNav ? "active" : ""}>
                    <div className="navInner">
                        <NavList />
                    </div>
                </Styled.NavWrapper>

                <Styled.ContentWrapper id="scroll-root" data-scroll-root ref={contentRef}>
                    <Styled.RoutesWrapper>
                        <Breadcrumbs />
                        <Suspense
                            fallback={
                                <Box sx={{
                                    width: '100%', height: '200px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <CircularProgress />
                                </Box>
                            }
                        >
                            <AppRoutes />
                        </Suspense>
                    </Styled.RoutesWrapper>

                    <Styled.Footer>
                        <Footer />
                    </Styled.Footer>
                </Styled.ContentWrapper>
            </Styled.Main>

            {showScrollTop && (
                <Styled.ScrollTopBtn onClick={scrollToTop} aria-label="Scroll to top" title="Scroll to top">
                    <MdArrowUpward size={20} />
                </Styled.ScrollTopBtn>
            )}

            <ScrollToTop />
        </Styled.Wrapper>
    );
};

export default App;
