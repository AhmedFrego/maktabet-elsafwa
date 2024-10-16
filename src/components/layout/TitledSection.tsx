import React, { FC } from "react";
import { HeadingSecondary } from "components/";

export const TitledSection: FC<{
	passedClass: string;
	title: string;
	id: string;
	extraClass?: string;
	to?: string;
	divClass?: string;
}> = ({ title, children, passedClass, id, extraClass = "", to, divClass }) => {
	return (
		<section id={id} className={`${passedClass} section-${passedClass}  ${extraClass}`}>
			<HeadingSecondary text={title} to={to} />
			<div className={`${passedClass}-container ${divClass} container flex flex--3 `}>{children}</div>
		</section>
	);
};
