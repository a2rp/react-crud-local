import styled from "styled-components";

const surface = "var(--card, #111318)";
const border = "var(--border, #23262d)";
const text = "var(--text, #f3f4f6)";
const muted = "var(--muted, #a0a0a7)";
const accent = "var(--accent, #5aa9ff)";
const accentSoft = "var(--accent-soft, rgba(90,169,255,0.15))";
const cardBase = `border: 1px solid ${border}; border-radius: 16px; background: ${surface}; box-shadow: 0 14px 35px rgba(0, 0, 0, 0.16);`;

const Wrapper = styled.div`padding: 16px 0 30px;`;
const Hero = styled.section`
    ${cardBase}; display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; padding: clamp(22px, 5vw, 48px);
    background: radial-gradient(circle at 85% 20%, ${accentSoft}, transparent 34%), ${surface};
    h1 { max-width: 620px; margin: 8px 0 12px; font-size: clamp(2.2rem, 5vw, 4.6rem); line-height: 0.98; }
    p { max-width: 620px; margin: 0; color: ${muted}; font-size: 1.05rem; }
    .eyebrow { color: ${accent}; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; }
    .storageBadge { display: flex; align-items: center; gap: 10px; min-width: 190px; padding: 13px; color: ${accent}; border: 1px solid ${border}; border-radius: 12px; background: rgba(255,255,255,0.02); svg { font-size: 24px; } span { display: grid; gap: 2px; } strong { color: ${text}; font-size: 0.82rem; } small { color: ${muted}; } }
    @media (max-width: 720px) { display: grid; align-items: start; .storageBadge { min-width: 0; width: fit-content; } }
`;
const Stats = styled.section`
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 16px 0;
    article { ${cardBase}; display: grid; gap: 3px; padding: 17px 20px; transition: border-color 0.2s ease, box-shadow 0.2s ease; &:hover { border-color: ${accent}; box-shadow: 0 0 0 3px ${accentSoft}; } }
    strong { color: ${text}; font-size: 1.7rem; } span { color: ${muted}; font-size: 0.82rem; }
    @media (max-width: 560px) { gap: 8px; article { padding: 14px 12px; } strong { font-size: 1.35rem; } }
`;
const ContentGrid = styled.section`display: grid; grid-template-columns: minmax(250px, 0.7fr) minmax(0, 1.3fr); gap: 16px; @media (max-width: 960px) { grid-template-columns: 1fr; }`;
const FormCard = styled.article`
    ${cardBase}; padding: 22px;
    .cardHeading { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
    .cardHeading > svg { color: ${accent}; font-size: 24px; }
    .eyebrow { color: ${accent}; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; }
    h2 { margin-top: 5px; font-size: 1.45rem; } form { display: grid; gap: 9px; }
    label { margin-top: 7px; color: ${muted}; font-size: 0.8rem; } textarea { resize: vertical; min-height: 120px; }
    .formActions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; } button { display: inline-flex; align-items: center; justify-content: center; gap: 7px; }
`;
const ListCard = styled.article`
    ${cardBase}; min-width: 0; padding: 22px;
    .listHeader { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
    .eyebrow { color: ${accent}; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; } h2 { margin-top: 5px; font-size: 1.45rem; }
    .quiet { color: ${muted}; background: transparent; } .recordList { display: grid; gap: 10px; }
    .record { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: start; gap: 12px; padding: 14px; border: 1px solid ${border}; border-radius: 12px; transition: border-color 0.2s ease, box-shadow 0.2s ease; &:hover { border-color: ${accent}; box-shadow: 0 0 0 3px ${accentSoft}; } &.completed { opacity: 0.72; h3 { text-decoration: line-through; } .recordCheck { color: #50d890; } } }
    .recordCheck, .recordActions button { display: grid; place-items: center; width: 34px; height: 34px; padding: 0; color: ${muted}; border-radius: 8px; background: transparent; }
    .recordCheck { border-color: transparent; font-size: 22px; } .recordCheck:hover, .recordActions button:hover { color: ${accent}; }
    .recordBody { min-width: 0; } h3 { overflow: hidden; color: ${text}; font-size: 0.98rem; text-overflow: ellipsis; white-space: nowrap; }
    p { margin: 4px 0; overflow: hidden; color: ${muted}; font-size: 0.86rem; text-overflow: ellipsis; white-space: nowrap; } small { color: ${muted}; font-size: 0.72rem; }
    .recordActions { display: flex; gap: 4px; button:last-child:hover { color: #f16b75; } }
    .emptyState { display: grid; place-items: center; gap: 8px; min-height: 210px; color: ${muted}; text-align: center; border: 1px dashed ${border}; border-radius: 12px; svg { color: ${accent}; font-size: 30px; } strong { color: ${text}; } }
    @media (max-width: 560px) { padding: 16px; .record { grid-template-columns: auto minmax(0, 1fr); } .recordActions { grid-column: 2; } }
`;
export const Styled = { Wrapper, Hero, Stats, ContentGrid, FormCard, ListCard };
