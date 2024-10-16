import { useDispatch, useSelector } from "react-redux";

import {modalActions,RootState,reservationActions} from "../../store";

import { circleXMark, circleCheck } from "../../assets/SVGs";
import { ReserveModal } from "./";

export const ReservingBar = () => {
	const dispatch = useDispatch();
	const reserving = useSelector((state: RootState) => state.reservation.temporarilyNotes).length > 0;
	const cancelReserving = () => dispatch(reservationActions.endReserving());
	const finishReserving = () => dispatch(modalActions.showModel(ReserveModal));

	return (
		<>
			{reserving && (
				<div className="reserving-bar">
					<button className="reserving-bar__button reserving-bar__button--finish" onClick={finishReserving}>
						{circleCheck}
					</button>
					<button className="reserving-bar__button reserving-bar__button--end" onClick={cancelReserving}>
						{circleXMark}
					</button>
				</div>
			)}
		</>
	);
};
