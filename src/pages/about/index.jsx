import { MdStorage, MdViewSidebar, MdWidgets } from "react-icons/md";
import { Styled } from "./styled";

const About = () => (
    <Styled.Wrapper>
        <span className="eyebrow">ABOUT THIS PROJECT</span>
        <h1>Local-first CRUD, kept readable.</h1>
        <p className="intro">React CRUD Local is a small frontend workspace for practicing record management without requiring a server or database.</p>
        <div className="cards">
            <article><MdStorage aria-hidden="true" /><h2>Browser storage</h2><p>Records are persisted in localStorage so the workspace stays useful after a refresh.</p></article>
            <article><MdWidgets aria-hidden="true" /><h2>Clear interactions</h2><p>Add, edit, complete and delete actions are kept close to the data they change.</p></article>
            <article><MdViewSidebar aria-hidden="true" /><h2>Reusable shell</h2><p>The theme, navigation, breadcrumbs and route structure make the app easy to extend.</p></article>
        </div>
    </Styled.Wrapper>
);

export default About;
