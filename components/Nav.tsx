import { LINKS } from "@/constant";
import { Link } from "react-scroll";

const Nav = ({ containerStyles, linkStyles }: navProps) => {
  return (
    <nav className={`${containerStyles}`}>
        {LINKS.map((link) => (
            <Link
                key={link.title}
                to={link.path}
                offset={link.offset}
                spy={true}
                smooth={true}
                duration={500}
                activeClass="active"
                className={`${linkStyles}`}
            >
                {link.title}
            </Link>
        ))}
    </nav>
  );
};

type navProps = {
    containerStyles: string;
    linkStyles: string;
}
export default Nav;
