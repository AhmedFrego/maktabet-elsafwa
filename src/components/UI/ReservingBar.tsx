import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import reservationActions from "../../store/reservation-slice";
import modalActions from "../../store/modal-slice";
import ReserveModal from "./ReservingModal";

import { circleXMark, circleCheck } from "../../assets/SVGs";

const ReservingBar = () => {
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

export default ReservingBar;
