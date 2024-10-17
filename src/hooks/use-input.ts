import { FormEvent, useState, useCallback, useEffect } from "react";
import { getArabicNumbers } from "../functions/getArabicNumbers";

export const useInput = (options: { validate: (x: any) => boolean | void; className?: string; startValue?: string }) => {
	const [valueState, setValueState] = useState(options.startValue || "");
	const [containerClass, setContainerClass] = useState(options.className);

	const [touched, setTouced] = useState(false);
	const [active, setactive] = useState(false);
	const [choosingState, setChoosingState] = useState(false);
	const hasError = !options.validate(valueState) && touched;

	const changeHandler = (e: FormEvent<HTMLInputElement>) => setValueState(e.currentTarget.value);
	const setValue = (value: string) => setValueState(value);

	useEffect(() => {
		if (valueState) setContainerClass(options.className + " input--active " + (hasError ? " input--invalid " : ""));
	});

	const arabicValue = getArabicNumbers(valueState);
	const clickHandler = () => setactive(true);

	const focusHandler = () => {
		setactive(true);
		setChoosingState(true);
		setContainerClass(options.className + " input--active ");
	};
	const resetValue = useCallback((x: string = "") => {
		setValueState(x);
		setTouced(false);
	}, []);

	const blurHandler = () => {
		setTouced(true);
		setactive(false);
		if (!valueState) setContainerClass(options.className);
		if (!options.validate(valueState)) setContainerClass((options.className += " input--invalid "));
	};

	return {
		arabicValue,
		value: valueState,
		active,
		hasError,
		isValid: options.validate(valueState),
		blurHandler,
		changeHandler,
		focusHandler,
		resetValue,
		clickHandler,
		containerClass,
		setValue,
		choosingState,
		setChoosingState,
	};
};
