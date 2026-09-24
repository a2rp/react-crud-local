import styled, { css } from "styled-components";

const bg = "var(--bg, #0d1117)";
const text = "var(--text, #f3f4f6)";
const muted = "var(--muted, #a0a0a7)";
const card = "var(--card, #111318)";
const border = "var(--border, #23262d)";
const accent = "var(--accent, #5aa9ff)";
const accentSoft = "var(--accent-soft, rgba(90,169,255,0.15))";

const hoverScrollbarStable = css`
    scrollbar-gutter: stable;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
    &::-webkit-scrollbar { width: 11px; height: 11px; }
    &::-webkit-scrollbar-thumb { background: transparent; border-radius: 8px; border: 3px solid transparent; background-clip: content-box; }
    @media (hover: hover) {
        &:hover { scrollbar-color: #626975 transparent; }
        &:hover::-webkit-scrollbar-thumb { background: #626975; }
    }
    @media (hover: none) {
        scrollbar-color: #555b66 transparent;
        &::-webkit-scrollbar-thumb { background: #555b66; }
    }
`;

const Wrapper = styled.div`
    position: relative; height: 100vh; overflow: hidden; color: ${text}; background: ${bg};
`;

const Header = styled.header`
    position: fixed; inset: 0 0 auto; z-index: 1000; height: 72px;
    display: flex; align-items: center; justify-content: space-between; gap: 24px;
    padding: 12px 20px; border-bottom: 1px solid ${border}; background: ${bg};
`;

const LogoLinkWrapper = styled.div`
    display: flex; align-items: center; gap: 12px; min-width: 0;
    > a {
        display: flex; align-items: center; gap: 10px; min-width: 0;
        color: ${text}; text-decoration: none; transition: color 0.2s ease, text-shadow 0.2s ease;
        &:hover { color: ${accent}; text-shadow: 0 0 16px ${accentSoft}; }
        img { width: 36px; height: 36px; object-fit: contain; border: 1px solid ${border}; border-radius: 10px; background: ${card}; }
        span { display: grid; gap: 1px; font-weight: 700; white-space: nowrap; }
        small { color: ${muted}; font-size: 9px; letter-spacing: 0.16em; font-weight: 700; }
    }
`;

const NavLinkWrapper = styled.button`
    width: 40px; height: 40px; display: grid; place-items: center; flex: 0 0 auto;
    cursor: pointer; color: ${muted}; border: 1px solid ${border}; border-radius: 9px; background: ${card};
    transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    &:hover { color: ${accent}; border-color: ${accent}; box-shadow: 0 0 0 3px ${accentSoft}; }
`;

const Heading = styled.div`
    display: flex; align-items: center; gap: 12px;
    .status { color: ${muted}; font-size: 12px; }
    .themeToggle { width: 38px; height: 38px; display: grid; place-items: center; padding: 0; color: ${muted}; border-radius: 9px; }
    .themeToggle:hover { color: ${accent}; }
    @media (max-width: 640px) { .status { display: none; } }
`;

const Main = styled.main`display: flex; height: 100vh; padding-top: 72px; overflow: hidden;`;

const NavWrapper = styled.aside`
    position: relative; z-index: 900; width: 0; flex: 0 0 0; overflow: hidden;
    background: ${card}; border-right: 1px solid transparent;
    transition: width 0.2s ease, flex-basis 0.2s ease, border-color 0.2s ease;
    &.active { width: 260px; flex-basis: 260px; border-color: ${border}; }
    .navInner { width: 260px; height: 100%; padding: 16px; overflow-y: auto; ${hoverScrollbarStable}; }
    @media (max-width: 900px) {
        position: fixed; inset: 72px auto 0 0; width: 0; height: calc(100vh - 72px);
        box-shadow: 14px 0 36px rgba(0, 0, 0, 0.25);
        &.active { width: 260px; flex-basis: auto; }
    }
`;

const ContentWrapper = styled.section`
    flex: 1 1 auto; min-width: 0; overflow: auto; padding: 18px 22px 44px;
    background: ${bg}; scroll-behavior: smooth; ${hoverScrollbarStable};
    @media (max-width: 640px) { padding: 14px 14px 32px; }
`;

const RoutesWrapper = styled.div`width: min(100%, 1240px); min-height: calc(100vh - 150px); margin: 0 auto;`;
const Footer = styled.footer`width: min(100%, 1240px); margin: 0 auto;`;

const ScrollTopBtn = styled.button`
    position: fixed; right: 24px; bottom: 24px; z-index: 1200; width: 42px; height: 42px;
    display: grid; place-items: center; padding: 0; color: ${text}; border-radius: 50%; background: ${card};
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
    transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    &:hover { color: ${accent}; box-shadow: 0 0 0 3px ${accentSoft}, 0 10px 28px rgba(0, 0, 0, 0.35); }
    @media (max-width: 640px) { right: 16px; bottom: 16px; }
`;

export default { Wrapper, Header, LogoLinkWrapper, NavLinkWrapper, Heading, Main, NavWrapper, ContentWrapper, RoutesWrapper, Footer, ScrollTopBtn };
