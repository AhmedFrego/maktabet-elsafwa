import React, { FC, ElementType, HTMLAttributes, useState } from "react";
import { eye, eyeSlash } from "assets/SVGs";

interface inputProps extends HTMLAttributes<HTMLOrSVGElement> {
	id?: string;
	label?: any;
	type?: string;
	value: string;
	inputClass?: string;
	containerClass: string;
	labelClass?: string;
	invalidText?: string;
	changeHandler?: (x: any) => void;
	focusHandler?: () => void;
	blurHandler?: () => void;
	svg?: { svg: any; class: string };
	labelClick?: () => void;
	tag?: ElementType;
	invalidTextClickHandler?: () => void;
}

export const Input: FC<inputProps> = ({ tag: Tag = "input", ...inputProps }) => {
	const [modifyType, SetModifyType] = useState(inputProps.type);
	const showPasswordHandler = () => (modifyType === "password" ? SetModifyType("text") : SetModifyType("password"));

	const { inputClass = "input__input", labelClass="input__label" } = inputProps;

	const invalidTextClickHandler = inputProps.invalidTextClickHandler ? inputProps.invalidTextClickHandler : () => {};

	return (
		<div className={inputProps.containerClass}>
			{inputProps.label && (
				<label htmlFor={inputProps.id} className={labelClass} onClick={inputProps.labelClick}>
					{inputProps.label}
				</label>
			)}

			<Tag
				id={inputProps.id || ""}
				type={modifyType}
				value={inputProps.value}
				className={inputClass}
				onChange={inputProps.changeHandler}
				onBlur={inputProps.blurHandler}
				onFocus={inputProps.focusHandler}
			/>
			{inputProps.type === "password" && (
				<div className="input__svg" onClick={showPasswordHandler}>
					{modifyType === "password" && eye}
					{modifyType === "text" && eyeSlash}
				</div>
			)}
			<p onClick={invalidTextClickHandler}>{inputProps.invalidText || ""}</p>
		</div>
	);
};
