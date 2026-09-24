import styled from "styled-components";

const Wrapper = styled.div`
    margin-top: 26px; padding: 22px; color: var(--muted); border: 1px solid var(--border); border-radius: 16px; background: var(--card);
    .footerTop, .footerBottom { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
    .footerTop { padding-bottom: 18px; } strong { color: var(--text); font-size: 1rem; } p { margin-top: 4px; font-size: 0.82rem; }
    .linkGroups { display: flex; gap: 24px; } .linkGroups > div { display: grid; gap: 7px; }
    .linkGroups span { color: var(--text); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
    .iconLinks { display: flex; flex-wrap: wrap; gap: 6px; }
    .iconLinks a { display: grid; place-items: center; width: 30px; height: 30px; color: var(--muted); border: 1px solid var(--border); border-radius: 8px; transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; }
    .iconLinks a:hover { color: var(--accent); border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
    .footerBottom { padding-top: 16px; border-top: 1px solid var(--border); font-size: 0.78rem; }
    .footerBottom a { color: var(--text); font-weight: 700; } .footerBottom a:hover { color: var(--accent); }
    @media (max-width: 760px) { .footerTop, .footerBottom { align-items: flex-start; flex-direction: column; } .linkGroups { flex-wrap: wrap; } }
`;
export const Styled = { Wrapper };
