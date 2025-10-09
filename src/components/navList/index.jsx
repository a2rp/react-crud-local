import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { Styled } from "./styled";
import { MdClear } from "react-icons/md";

const STORAGE_KEY = "navSearch";
const COLLAPSE_KEY = "navCollapsed";

const NavListCore = () => {
    const navRef = useRef(null);
    const wrapperRef = useRef(null);
    const searchInputRef = useRef(null);
    const { pathname } = useLocation();

    const [search, setSearch] = useState(() => {
        try { return sessionStorage.getItem(STORAGE_KEY) ?? ""; } catch { return ""; }
    });
    const [collapsed, setCollapsed] = useState(() => {
        try { return JSON.parse(sessionStorage.getItem(COLLAPSE_KEY) || "{}"); } catch { return {}; }
    });

    /* -------------------------------------------------------
       Keep the active link centered
       ------------------------------------------------------- */
    useEffect(() => {
        const el = navRef.current?.querySelector("a.active");
        if (!el) return;
        const id = requestAnimationFrame(() => {
            try { el.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" }); }
            catch { el.scrollIntoView(); }
        });
        return () => cancelAnimationFrame(id);
    }, [pathname]);

    /* -------------------------------------------------------
       Collapse logic
       ------------------------------------------------------- */
    const applySectionCollapse = useCallback((sectionLabel, isCollapsed) => {
        const root = wrapperRef.current; if (!root) return;
        const h = root.querySelector(`h3.title[data-sec="${CSS.escape(sectionLabel)}"]`);
        if (!h) return;
        let node = h.nextElementSibling;
        while (node && node.tagName !== "H3") {
            if (node.tagName === "A") node.setAttribute("data-collapsed", isCollapsed ? "true" : "false");
            node = node.nextElementSibling;
        }
        h.setAttribute("data-collapsed", isCollapsed ? "true" : "false");
    }, []);

    const applyAllCollapsed = useCallback(() => {
        const root = wrapperRef.current; if (!root) return;
        const headers = Array.from(root.querySelectorAll("h3.title[data-sec]"));
        headers.forEach(h => {
            const key = h.getAttribute("data-sec");
            const isCollapsed = !!collapsed[key];
            applySectionCollapse(key, isCollapsed);
        });
    }, [collapsed, applySectionCollapse]);

    useEffect(() => {
        try { sessionStorage.setItem(COLLAPSE_KEY, JSON.stringify(collapsed)); } catch { }
        applyAllCollapsed();
    }, [collapsed, applyAllCollapsed]);

    /* -------------------------------------------------------
       Search filter
       ------------------------------------------------------- */
    useEffect(() => {
        try { sessionStorage.setItem(STORAGE_KEY, search); } catch { }
        const root = wrapperRef.current; if (!root) return;
        const q = search.trim().toLowerCase();
        const tokens = q.length ? q.split(/\s+/).filter(Boolean) : [];
        const links = Array.from(root.querySelectorAll("a[href]"));

        links.forEach((a) => {
            const label = (a.textContent || "").toLowerCase();
            const title = (a.getAttribute("title") || "").toLowerCase();
            const isMatch = tokens.length === 0 || tokens.every((t) => (label + " " + title).includes(t));
            a.setAttribute("data-hidden", isMatch ? "false" : "true");
        });

        const headers = Array.from(root.querySelectorAll("h3.title[data-sec]"));
        if (tokens.length === 0) {
            headers.forEach(h => h.setAttribute("data-hidden", "false"));
            applyAllCollapsed();
        } else {
            headers.forEach((h) => {
                let hasVisible = false;
                let node = h.nextElementSibling;
                while (node && node.tagName !== "H3") {
                    if (node.tagName === "A" && node.getAttribute("data-hidden") === "false") { hasVisible = true; break; }
                    node = node.nextElementSibling;
                }
                h.setAttribute("data-hidden", hasVisible ? "false" : "true");
                const key = h.getAttribute("data-sec");
                applySectionCollapse(key, hasVisible ? false : !!collapsed[key]);
            });
        }
    }, [search, collapsed, applyAllCollapsed, applySectionCollapse]);

    /* -------------------------------------------------------
       Input + keyboard helpers
       ------------------------------------------------------- */
    const handleSearchChange = (e) => setSearch(e.target.value);
    const clearSearch = () => setSearch("");
    const toggleSection = (key) => setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
    const onTitleKey = (e, key) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleSection(key); }
    };

    /* -------------------------------------------------------
       Focus search on mount
       ------------------------------------------------------- */
    useEffect(() => {
        const el = searchInputRef.current;
        if (!el) return;
        const id = requestAnimationFrame(() => {
            try { el.focus({ preventScroll: true }); } catch { el.focus(); }
        });
        return () => cancelAnimationFrame(id);
    }, []);

    /* -------------------------------------------------------
       Auto open section for active route
       ------------------------------------------------------- */
    useEffect(() => {
        const root = wrapperRef.current;
        if (!root) return;
        const raf = requestAnimationFrame(() => {
            const pickSectionHeader = (anchor) => {
                if (!anchor) return null;
                let node = anchor.previousElementSibling;
                while (node && node.tagName !== "H3") node = node.previousElementSibling;
                return node && node.classList.contains("title") ? node : null;
            };
            let active = root.querySelector("a.active");
            let header = pickSectionHeader(active);
            if (!header) {
                const seg = "/" + (pathname.split("/")[1] || "");
                const anchor = root.querySelector(`a[href="${seg}"]`);
                header = pickSectionHeader(anchor);
            }
            const key = header?.getAttribute("data-sec");
            if (key) setCollapsed(prev => (prev[key] ? { ...prev, [key]: false } : prev));
        });
        return () => cancelAnimationFrame(raf);
    }, [pathname]);

    const ariaExpandedFor = (sec) => {
        const root = wrapperRef.current;
        if (root) {
            const h = root.querySelector(`h3.title[data-sec="${CSS.escape(sec)}"]`);
            if (h) return h.getAttribute("data-collapsed") !== "true";
        }
        return !(collapsed[sec] ?? false);
    };

    /* -------------------------------------------------------
       Render (all links added manually)
       ------------------------------------------------------- */
    return (
        <Styled.Nav ref={navRef} aria-label="Delivery Logistics Navigation">
            <div className="searchWraper">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search (Ctrl + K)"
                    value={search}
                    onChange={handleSearchChange}
                    aria-label="Search navigation"
                    aria-controls="navlinksWrapper"
                />
                {search.trim().length > 0 && (
                    <div className="clearIconWrapper" onClick={clearSearch} role="button" aria-label="Clear search" title="Clear">
                        <MdClear size={20} />
                    </div>
                )}
            </div>

            <div className="navlinksWrapper" id="navlinksWrapper" ref={wrapperRef}>
                {/* Core */}
                <h3 className="title" data-sec="Core" role="button" tabIndex={0}
                    data-collapsed={collapsed["Core"] ? "true" : "false"}
                    aria-expanded={ariaExpandedFor("Core")}
                    onClick={() => toggleSection("Core")}
                    onKeyDown={(e) => onTitleKey(e, "Core")}>
                    <span className="chev" aria-hidden="true"></span> Core
                </h3>
                <NavLink to="/home" end title="Landing overview" className="home">Home</NavLink>
                <NavLink to="/about" end title="About this project">About</NavLink>
            </div>

            <style>{`
        [data-hidden="true"] { display: none !important; }
        #navlinksWrapper a[data-collapsed="true"] { display: none !important; }
      `}</style>
        </Styled.Nav>
    );
};

export default NavListCore;
