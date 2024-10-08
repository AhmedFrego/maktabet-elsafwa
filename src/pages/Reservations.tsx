import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

import { ReservationClass } from "../models/ReservationClass";
import TitledSection from "../components/layout/TitledSection";
import Reservation from "../components/Reservation";
import NoItems from "../components/UI/NoItems";

import searchActions from "../store/search-slice";

const Reservations = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state: RootState) => state.reservation.reaservations) as ReservationClass[];
  const searchValue = useSelector((state: RootState) => state.search.value);
  const noItems = useSelector((state: RootState) => state.search.noItems);

  const filterdReservations = reservations.filter((reservation) => reservation.name.includes(searchValue));

  if (reservations.length !== 0 && filterdReservations.length === 0) dispatch(searchActions.noItemsHandler(true));
  if (filterdReservations.length !== 0) dispatch(searchActions.noItemsHandler(false));
  return (
    <TitledSection id="reservations" passedClass="pricing" title="حجوزات">
      {noItems && <NoItems text="معرفش حد بالإسم ده 🙄🙄" />}
      {reservations.length === 0 && <NoItems text="🤕🤕خلصنا الشغل كلو الله ينور 💪💪" />}
      {filterdReservations.map((reservation) => {
        return <Reservation key={reservation.id} {...reservation} />;
      })}
    </TitledSection>
  );
};

export default Reservations;
