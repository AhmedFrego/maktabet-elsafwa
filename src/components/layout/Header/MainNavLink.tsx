import React, { FC } from "react";
import { NavLink } from "react-router-dom";

interface NaveLinkProps {
	title: string |JSX.Element;
	path: string;
	cssClass: string;
}

export const MainNavLink: FC<NaveLinkProps> = ({ path, title, cssClass }) => (
	<li className="main-nav__item">
		<NavLink to={path} className={({ isActive }) => (isActive ? `${cssClass} ${cssClass}--active` : cssClass)}>
			{title}
		</NavLink>
	</li>
);
