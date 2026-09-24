import styled from "styled-components";

export const Styled = {
    Nav: styled.nav`
        display: grid; gap: 12px; min-height: 100%;
        .navIntro { display: grid; gap: 3px; padding: 4px 4px 8px; }
        .eyebrow { color: var(--accent); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em; }
        .navIntro strong { color: var(--text); font-size: 1rem; }
        .searchWrap { position: relative; display: block; input { padding-right: 36px; } button { position: absolute; top: 50%; right: 5px; width: 30px; height: 30px; display: grid; place-items: center; padding: 0; color: var(--muted); border: 0; background: transparent; transform: translateY(-50%); } }
        .sectionTitle { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 8px 2px; color: var(--muted); border: 0; background: transparent; font-size: 0.76rem; letter-spacing: 0.1em; text-transform: uppercase; }
        .sectionTitle:hover { color: var(--accent); box-shadow: none; }
        .links { display: grid; gap: 5px; }
        .links a { display: flex; align-items: center; gap: 9px; padding: 10px; color: var(--muted); border: 1px solid transparent; border-radius: 9px; transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; }
        .links a:hover, .links a.active { color: var(--accent); border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
        .links a svg { flex: 0 0 auto; font-size: 19px; } .empty { padding: 10px; color: var(--muted); font-size: 0.8rem; }
        .srOnly { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
    `,
};
