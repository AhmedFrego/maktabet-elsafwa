import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { Button } from "components/";
import { RootState, supabase, userActions } from "store/";
import { Routes } from "models/";

export const ProfileInfoPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

	const userData = useSelector((state: RootState) => state.user.user);

	const logOutHandler = async () => {
		const { error } = await supabase.auth.signOut();
		dispatch(userActions.logout());
		navigate(Routes.LOG_IN);
	};

	if (!isLoggedIn) return <Navigate to={Routes.LOG_IN} />;
	else
		return (
			<div style={{ fontSize: "3rem" }}>
				UserDataPage
				<p>{userData.id}</p>
				<Button children={"تسجيل الخروج"} onClick={logOutHandler} />
			</div>
		);
};
