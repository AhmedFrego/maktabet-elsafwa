import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router";

export const ProfileInfo = () => {
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
	React.useEffect(() => !isLoggedIn && navigate("/log-in"), [isLoggedIn, navigate]);

	const userData = useSelector((state: RootState) => state.user.user);

	console.log(userData, isLoggedIn);
	return (
		<div style={{ fontSize: "3rem" }}>
			UserDataPage
			<p>{userData.id}</p>
		</div>
	);
};
