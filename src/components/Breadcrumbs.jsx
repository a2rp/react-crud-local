import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const labels = { home: "Home", about: "About" };
const humanize = (segment) => decodeURIComponent(segment).replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const Breadcrumbs = () => {
    const { pathname } = useLocation();
    const crumbs = useMemo(() => {
        const segments = pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
        if (segments.length === 0) return [{ to: "/home", label: "Home", current: true }];
        const result = [{ to: "/home", label: "Home", current: segments[0] === "home" }];
        if (segments[0] !== "home") result.push({ to: `/${segments[0]}`, label: labels[segments[0]] || humanize(segments[0]), current: true });
        return result;
    }, [pathname]);

    return <StyledNav aria-label="Breadcrumb"><ol>{crumbs.map((crumb, index) => <li key={crumb.to}>{crumb.current ? <span aria-current="page">{crumb.label}</span> : <NavLink to={crumb.to}>{crumb.label}</NavLink>}{index < crumbs.length - 1 && <b aria-hidden="true">&gt;</b>}</li>)}</ol></StyledNav>;
};

const StyledNav = styled.nav`
    margin-bottom: 14px; color: var(--muted); font-size: 0.78rem;
    ol { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; list-style: none; }
    li { display: inline-flex; align-items: center; gap: 7px; }
    a:hover, [aria-current="page"] { color: var(--accent); } b { color: var(--border); }
`;
export default Breadcrumbs;
