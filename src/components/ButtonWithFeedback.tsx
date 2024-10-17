import React from "react";
import { Button } from "./";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	feedBack: string;
}

export const ButtonWithFeedback: React.FC<Props> = (props) => {
	return (
		<div style={{position:'relative', display:'contents'}}>
			<Button {...props} />
			<p className={`invalid-text ${!!props.feedBack.length ? "invalid-text--active":''}`}>{props.feedBack}</p>
		</div>
	);
};
