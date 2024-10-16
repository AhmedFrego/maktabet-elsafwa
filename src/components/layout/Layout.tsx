import { FC } from "react";
import { useSelector } from "react-redux";

import { Header } from "./";

import { ReservingBar, Modal } from "components/UI";

import { RootState, status as STATUS} from "store/";


export const Layout: FC = ({ children }) => {
	const statusMessage = useSelector((state: RootState) => state.statusBar.message);
	const status = useSelector((state: RootState) => state.statusBar.status);
	const time = useSelector((state: RootState) => state.statusBar.time);

	let statusClass = "status__message ";
	if (status === STATUS.BLUE) statusClass += "status__message--blue";
	if (status === STATUS.GREEN) statusClass += "status__message--green";
	if (status === STATUS.RED) statusClass += "status__message--red";

	return (
		<>
			<div className="full-logo">
				<img src={require("assets/imgs/safwa.png")} alt="full logo" />
			</div>
			{statusMessage.length > 10 && (
				<div className={statusClass} style={{ animationDuration: time }}>
					<p>{statusMessage}</p>
				</div>
			)}
			<Modal />
			<Header />
			<main>{children}</main>

			<ReservingBar />
		</>
	);
};
