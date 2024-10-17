import React, { FC, ElementType, HTMLAttributes, useState } from "react";
import { eye, eyeSlash, circleXMark, plusCircle } from "assets/SVGs";
import { useInput } from "hooks/";

export interface DataPassType {
	value: string;
	choosingState: boolean;
}
interface ChoiseType {
	value: string;
	text: string;
}

export interface inputProps extends HTMLAttributes<HTMLOrSVGElement> {
	id?: string;
	label?: any;
	type?: string;
	value?: string;
	inputClass?: string;
	containerClass?: string;
	labelClass?: string;
	invalidText?: string;
	changeHandler?: (x: any) => void;
	focusHandler?: () => void;
	blurHandler?: () => void;
	svg?: { svg: any; class: string };
	labelClick?: () => void;
	tag?: ElementType;
	invalidTextClickHandler?: () => void;
	resetable?: boolean;
	dataPass?: (dataPass: DataPassType) => void;
	data?: ChoiseType[];
	dataHandler?: (choise: ChoiseType) => void;
	canCreateChoise?: boolean;
	createChoise?: (value: string) => void;
}

export const Input: FC<inputProps> = ({ tag: Tag = "input", ...inputProps }) => {
	const [modifyType, SetModifyType] = useState(inputProps.type);
	const showPasswordHandler = () => (modifyType === "password" ? SetModifyType("text") : SetModifyType("password"));

	const invalidTextClickHandler = inputProps.invalidTextClickHandler ? inputProps.invalidTextClickHandler : () => {};

	const { blurHandler, changeHandler, focusHandler, value, containerClass, setValue, choosingState, setChoosingState, resetValue } =
		useInput({
			validate: (x) => x.trim().length > 0,
			className: "input",
		});
	const {
		inputClass = "input__input",
		labelClass = "input__label",
		invalidText = "",
		resetable,
		changeHandler: ChangeHandler = changeHandler,
		blurHandler: BlurHandler = blurHandler,
		focusHandler: FocusHandler = focusHandler,
		containerClass: ContainerClass = containerClass + " input--form",
		value: Value = value,
	} = inputProps;

	const filteredList = inputProps.data ? inputProps.data.filter((choise) => choise.text.includes(value)) : [];

	const chooseHandler = (choise: ChoiseType) => {
		inputProps.dataHandler(choise);
		setValue(choise.text);
		setChoosingState(false);
	};

	return (
		<div className="auto-complete">
			<div className={ContainerClass}>
				{inputProps.label && (
					<label htmlFor={inputProps.id} className={labelClass} onClick={inputProps.labelClick}>
						{inputProps.label}
					</label>
				)}

				<Tag
					id={inputProps.id || ""}
					type={modifyType}
					value={Value}
					className={inputClass}
					onChange={ChangeHandler}
					onBlur={BlurHandler}
					onFocus={FocusHandler}
				/>
				{inputProps.type === "password" && (
					<div className="input__svg" onClick={showPasswordHandler}>
						{modifyType === "password" && eye}
						{modifyType === "text" && eyeSlash}
					</div>
				)}
				<p onClick={invalidTextClickHandler}>{invalidText}</p>
				{resetable && (
					<div className="input__reset" onClick={() => setValue("")}>
						{circleXMark}
					</div>
				)}
				{inputProps.canCreateChoise && !filteredList.length && (
					<div className="input__create" onClick={() => inputProps.createChoise(value)}>
						{plusCircle}
					</div>
				)}
			</div>
			{!!inputProps.data && choosingState && (
				<div className="auto-complete__list">
					{filteredList.map((choise) => (
						<p key={choise.value} className="auto-complete__list-item" onClick={() => chooseHandler(choise)}>
							{choise.text}
						</p>
					))}
				</div>
			)}
		</div>
	);
};
