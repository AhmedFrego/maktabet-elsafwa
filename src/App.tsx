import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import { spike } from "./functions";
import "./App.scss";

import { supabase } from "store/supabase";

import { Layout } from "./components/layout";
import { Reservations, NewNote, FullPage, PrintersSetting, ReservedNotes, LoginPage, ProfileInfoPage } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { RootState, userActions } from "store/";
import { Routes as MyRoutes } from "models/";

const App: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

	React.useEffect(() => spike(), []);

	React.useEffect(() => {
		retrieveSession();
	});

	const retrieveSession = async () => {
		await supabase.auth.getSession().then((returns) => {
			const {
				data: { session },
				error,
			} = returns;
			if (error) navigate(MyRoutes.LOG_IN);
			else {
				dispatch(
					userActions.logIn({
						session,
						user: session.user,
					})
				);
			}
		});
	};

	return (
		<Layout>
			<Routes>
				<Route path="/" element={<FullPage />} />

				<Route path={MyRoutes.LOG_IN} element={<LoginPage />} />
				<Route path={MyRoutes.PROFILE_INFO} element={<ProfileInfoPage />} />

				<Route path="/side-notes" element={<PrintersSetting />} />

				<Route path="/reservations" element={<Reservations />} />

				<Route path="/add/note" element={<NewNote />} />

				<Route path="/reserved-notes" element={<ReservedNotes />} />

				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Layout>
	);
};

export default App;
