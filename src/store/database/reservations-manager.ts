import {  getDatabase,  ref, set } from "firebase/database";

import { ReservationClass } from "../../models/ReservationClass";

export const addReservationToDB = (reservationData: ReservationClass) => {
  const db = getDatabase();
  set(ref(db, "/reservations/" + reservationData.id), { ...reservationData, id: null, date: new Date().toISOString() });
};

export const deletReservationFromDB = (id: string) => {
  const db = getDatabase();
  set(ref(db, "reservations/" + id), null);
};

