import { createElement } from "react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdClear, MdHome, MdInfoOutline } from "react-icons/md";
import { Styled } from "./styled";

const NavList = () => {
    const { pathname } = useLocation();
    const navRef = useRef(null);
    const [search, setSearch] = useState("");
    const [collapsed, setCollapsed] = useState(false);
    const links = [{ label: "Home", path: "/home", icon: MdHome }, { label: "About", path: "/about", icon: MdInfoOutline }];

    useEffect(() => { navRef.current?.querySelector("a.active")?.scrollIntoView({ block: "nearest" }); }, [pathname]);

    const visibleLinks = links.filter((link) => link.label.toLowerCase().includes(search.trim().toLowerCase()));

    return (
        <Styled.Nav ref={navRef} aria-label="App navigation">
            <div className="navIntro"><span className="eyebrow">WORKSPACE</span><strong>Navigate</strong></div>
            <label className="searchWrap" htmlFor="navigation-search">
                <span className="srOnly">Search navigation</span>
                <input id="navigation-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search pages" />
                {search && <button type="button" onClick={() => setSearch("")} aria-label="Clear navigation search"><MdClear aria-hidden="true" /></button>}
            </label>
            <button type="button" className="sectionTitle" aria-expanded={!collapsed} onClick={() => setCollapsed((value) => !value)}>Pages <span aria-hidden="true">{collapsed ? "+" : "-"}</span></button>
            {!collapsed && <div className="links">{visibleLinks.length > 0 ? visibleLinks.map(({ label, path, icon: Icon }) => <NavLink key={path} to={path} end={path === "/home"}>{createElement(Icon, { "aria-hidden": true })}{label}</NavLink>) : <span className="empty">No matching pages</span>}</div>}
        </Styled.Nav>
    );
};

export default NavList;
