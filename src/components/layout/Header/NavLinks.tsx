import { MainNavLink } from "./";
import { Outlet } from "react-router-dom";

interface navlink {
	title: string;
	path: string;
}

const navLinks: navlink[] = [
	{ title: "ملاحظات", path: "side-notes" },
	{ title: "مذكرة جديدة", path: "add/note" },
	{ title: "مذكرات", path: "notes" },
	{ title: "المذكرات المطلوبة ", path: "reserved-notes" },
	{ title: "حجوزات", path: "reservations" },
	{ title: "المستخدم", path: "user" },
];

export const NavLinks = () => {
	return (
		<ul className="header__nav main-nav">
			{navLinks.map((link) => (
				<MainNavLink key={link.title} path={`/${link.path.toLocaleLowerCase()}`} text={link.title} cssClass="main-nav__link" />
			))}
			<Outlet />
		</ul>
	);
};

