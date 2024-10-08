import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Input from "../../Input";
import { search } from "../../../assets/SVGs";

import { useInput } from "../../../hooks/use-input";

import searchActions from "../../../store/search-slice";
import { useLocation } from "react-router";

export const SearchInput = () => {
	const { value, clickHandler, resetValue, containerClass, changeHandler, blurHandler, focusHandler } = useInput({
		validate: (x) => true,
		className: "input",
	});
	const dispatch = useDispatch();
	const location = useLocation();

	const sectionName = location.pathname.match(/\/[a-z]+/) ? location.pathname.match(/\/[a-z]+/)![0] : "/";

	useEffect(() => {
		resetValue();
	}, [sectionName, resetValue]);

	useEffect(() => {
		dispatch(searchActions.valueHandler(value));
	}, [dispatch, value]);

	return (
		<Input
			containerClass={containerClass + " input--search "}
			id="search"
			inputClass="input__input"
			label={search}
			labelClass="input--search__icon"
			labelClick={clickHandler}
			value={value}
			changeHandler={changeHandler}
			blurHandler={blurHandler}
			focusHandler={focusHandler}
		/>
	);
};
