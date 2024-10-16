import React from "react";
import { useNavigate } from "react-router";

export const HeadingSecondary: React.FC<{ text: string; to?: string }> = ({ text, to }) => {
	const navigate = useNavigate();

	const navigateHandler = () => to && navigate(to);

	return (
		<>
			<h2 className={`heading--secondary ${to ? "clickable" : ""}`} onClick={navigateHandler}>
				{text}
			</h2>
		</>
	);
};
