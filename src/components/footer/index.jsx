import { createElement } from "react";
import { FaCodepen, FaCoffee, FaEnvelope, FaFacebook, FaGithub, FaGlobe, FaHandHoldingHeart, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Styled } from "./styled";

const links = [
    { label: "Portfolio", href: "https://www.ashishranjan.net/", icon: FaGlobe },
    { label: "GitHub", href: "https://github.com/a2rp", icon: FaGithub },
    { label: "CodePen", href: "https://codepen.io/ash1198", icon: FaCodepen },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", icon: FaLinkedin },
    { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", icon: FaFacebook },
    { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", icon: FaYoutube },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: FaEnvelope },
];
const supportLinks = [
    { label: "Support", href: "https://a2rp-donation-page.netlify.app/", icon: FaHandHoldingHeart },
    { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/a2rp", icon: FaCoffee },
    { label: "Patreon", href: "https://www.patreon.com/a2rp", icon: FaHandHoldingHeart },
];

const LinkList = ({ items }) => (
    <div className="iconLinks">
        {items.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} title={label} aria-label={label} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}>{createElement(Icon, { "aria-hidden": true })}</a>
        ))}
    </div>
);

export default function Footer() {
    return (
        <Styled.Wrapper role="contentinfo">
            <div className="footerTop">
                <div><strong>React CRUD Local</strong><p>A small, local-first workspace for readable CRUD practice.</p></div>
                <div className="linkGroups"><div><span>Connect</span><LinkList items={links} /></div><div><span>Support</span><LinkList items={supportLinks} /></div></div>
            </div>
            <div className="footerBottom">
                <span>Copyright &copy; {new Date().getFullYear()} <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></span>
                <span>Stored locally in your browser</span>
            </div>
        </Styled.Wrapper>
    );
}
