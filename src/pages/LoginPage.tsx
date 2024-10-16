import React, { FormEvent } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Input, Button, ButtonWithFeedback } from "components/";
import { useInput } from "hooks/use-input";
import { supabase } from "store/supabase/supabaseClient";
import { RootState, userActions } from "store/";

export const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
	const [errorMessage, seterrorMessage] = React.useState("");

	React.useEffect(() => isLoggedIn && navigate("/profile-info"), [isLoggedIn, navigate]);

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		await supabase.auth
			.signInWithPassword({
				email: emailValue,
				password: passwordValue,
			})
			.then(async (returns) => {
				const { data, error } = returns;
				seterrorMessage(error ? error.message : "");
				if (!error && !!data) {
					dispatch(userActions.logIn(data));
					navigate("/");
				}
			});
	};

	const {
		blurHandler: emailBlurHandler,
		changeHandler: emailChangrHandler,
		focusHandler: emailFocusHandler,
		value: emailValue,
		containerClass: emailContainerCalss,
	} = useInput({ validate: (x: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(x), className: "input", startValue: "" });

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
				label="الإيميل"
				value={emailValue}
				changeHandler={emailChangrHandler}
				blurHandler={emailBlurHandler}
				focusHandler={emailFocusHandler}
				invalidText="إيميل ده ؟🧐🧐"
			/>
			<Input
				containerClass={passwordContainerCalss + " input--form"}
				label="الرقم السري"
				value={passwordValue}
				changeHandler={passwordChangrHandler}
				blurHandler={passwordBlurHandler}
				focusHandler={passwordFocusHandler}
				invalidText="يجب أن يتكون الرقم السري من 8 حروف او أكثر وكدة 🫣🫣"
				type="password"
			/>
			<ButtonWithFeedback type="submit" children={"تسجيل الدخول"} feedBack={errorMessage} />
		</form>
	);
};
