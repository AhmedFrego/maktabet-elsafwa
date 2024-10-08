import React, { FC } from "react";
import { NavLink } from "react-router-dom";

interface NaveLinkProps {
	text: string;
	path: string;
	cssClass: string;
}

export const MainNavLink: FC<NaveLinkProps> = ({ path, text, cssClass }) => (
	<li className="main-nav__item">
		<NavLink to={path} className={({ isActive }) => (isActive ? `${cssClass} ${cssClass}--active` : cssClass)}>
			{text}
		</NavLink>
	</li>
);
