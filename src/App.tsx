import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import { Layout } from "./components/layout";
import { Reservations, NewNote, FullPage, PrintersSetting, ReservedNotes, LoginPage, ProfileInfo } from "./pages";

import { notesActions, reservationActions } from "./store";

import { spike } from "./functions/spiked";
import "./App.scss";

import { app } from "./store/database/index";
import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase(app));

let isInitial = true;

const App: React.FC = () => {
	const dispatch = useDispatch();

	React.useEffect(() => spike(), []);

	React.useEffect(() => {
		if (isInitial) {
			const notesHandler = (data: any) => {
				for (const key in data) dispatch(notesActions.addNote({ ...data[key], id: key }));
			};
			const reservationsHandler = (data: any) => {
				for (const key in data) dispatch(reservationActions.addReservation({ ...data[key], id: key }));
			};

			get(child(dbRef, `notes/`))
				.then((snapshot) => {
					notesHandler(snapshot.val());
				})
				.catch(() => {});
			get(child(dbRef, `reservations/`))
				.then((snapshot) => {
					reservationsHandler(snapshot.val());
				})
				.catch(() => {});
		}

		isInitial = false;
	}, [dispatch]);

	return (
		<Layout>
			<Routes>
				<Route path="/" element={<FullPage />} />

				<Route path="/log-in" element={<LoginPage />} />
				<Route path="/profile-info" element={<ProfileInfo />} />

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
