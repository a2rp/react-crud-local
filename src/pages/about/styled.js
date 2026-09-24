import styled from "styled-components";

const Wrapper = styled.section`
    max-width: 980px; padding: 36px 0 60px;
    .eyebrow { color: var(--accent); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; }
    h1 { max-width: 760px; margin: 10px 0 14px; font-size: clamp(2.4rem, 6vw, 5.4rem); line-height: 0.98; }
    .intro { max-width: 680px; color: var(--muted); font-size: 1.05rem; }
    .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 32px; }
    article { padding: 22px; border: 1px solid var(--border); border-radius: 15px; background: var(--card); transition: border-color 0.2s ease, box-shadow 0.2s ease; &:hover { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); } }
    svg { color: var(--accent); font-size: 26px; } h2 { margin: 15px 0 8px; font-size: 1.15rem; } article p { color: var(--muted); font-size: 0.9rem; }
    @media (max-width: 720px) { .cards { grid-template-columns: 1fr; } }
`;
export const Styled = { Wrapper };
