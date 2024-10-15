import React, { FormEvent } from "react";
import Input from "../components/Input";
import { useInput } from "../hooks/use-input";
import { supabase } from "../store/supabase/supabaseClient";

export const User = () => {
	const loginHandler = async () => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: emailValue,
			password: passwordValue,
		});
		return { data, error };
	};
	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		loginHandler().then(async (data) => {
			console.log("user-id", data.data.user.id);

			await supabase
				.from("notes")
				.select()
				// .textSearch("id", "53b0e1b4-b824-46f3-b96b-22c63807491c")
				.then((data) => console.log("user", data));
		});
	};

	const {
		blurHandler: emailBlurHandler,
		changeHandler: emailChangrHandler,
		focusHandler: emailFocusHandler,
		value: emailValue,
		containerClass: emailContainerCalss,
	} = useInput({ validate: (x: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(x), className: "input", startValue: "" });

	const {
		blurHandler: passwordBlurHandler,
		changeHandler: passwordChangrHandler,
		focusHandler: passwordFocusHandler,
		value: passwordValue,
		containerClass: passwordContainerCalss,
	} = useInput({ validate: (x: string) => x.length > 7, className: "input", startValue: "" });

	return (
		<form className={"container flex flex--column"} onSubmit={handleLogin}>
			<Input
				containerClass={emailContainerCalss + " input--form"}
				inputClass="input__input"
				label="الإيميل"
				labelClass="input__label"
				value={emailValue}
				changeHandler={emailChangrHandler}
				blurHandler={emailBlurHandler}
				focusHandler={emailFocusHandler}
				invalidText="إيميل ده ؟🧐🧐"
			/>
			<Input
				containerClass={passwordContainerCalss + " input--form"}
				inputClass="input__input"
				label="الرقم السري"
				labelClass="input__label"
				value={passwordValue}
				changeHandler={passwordChangrHandler}
				blurHandler={passwordBlurHandler}
				focusHandler={passwordFocusHandler}
				invalidText="يجب أن يتكون الرقم السري من 8 حروف او أكثر وكدة 🫣🫣"
				type="password"
			/>
			<button className="btn--main btn" type="submit" children={"تسجيل الدخول"} />
		</form>
	);
};
