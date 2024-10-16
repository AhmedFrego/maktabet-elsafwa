import { MainNavLink } from "./";
import { Outlet } from "react-router-dom";
import { user } from "../../../assets/SVGs";

interface navlink {
	title: string | JSX.Element;
	path: string;
}

const navLinks: navlink[] = [
	{ title: "ملاحظات", path: "side-notes" },
	{ title: "مذكرة جديدة", path: "add/note" },
	{ title: "مذكرات", path: "notes" },
	{ title: "المذكرات المطلوبة ", path: "reserved-notes" },
	{ title: "حجوزات", path: "reservations" },
	{ title: user, path: "log-in" },
];

export const NavLinks = () => {
	return (
		<ul className="header__nav main-nav">
			{navLinks.map((link) => (
				<MainNavLink key={link.title.toString()} path={`/${link.path.toLocaleLowerCase()}`} title={link.title} cssClass="main-nav__link" />
			))}
			<Outlet />
		</ul>
	);
};
