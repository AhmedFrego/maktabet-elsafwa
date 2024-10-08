import { Route, Routes, Navigate } from "react-router-dom";
import { FC, useEffect } from "react";

import Layout from "./components/layout/Layout";
import Reservations from "./pages/Reservations";
import NewNote from "./pages/NewNote";
import FullPage from "./pages/_FullPage";
import AllNotes from "./pages/Notes";
import PrintersSetting from "./pages/PrintersSetting";

import reservationActions from "./store/reservation-slice";
import notesActions from "./store/notes-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";

import { Stage, SubStage } from "./models/NoteClass";

import { spike } from "./functions/spiked";
import "./App.scss";

import { app } from "./store/database/index";
import { getDatabase, ref, child, get } from "firebase/database";
import ReservedNotes from "./pages/ReservedNotes";
import React from "react";

const dbRef = ref(getDatabase(app));

let isInitial = true;

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => spike(), []);

  useEffect(() => {
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

  const allNote = useSelector((state: RootState) => state.notes.AllNotes);

  const kg = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.stage === Stage.KG));
  const kg1 = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.subStage === SubStage["KG1"]));
  const kg2 = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.subStage === SubStage.KG2));

  const primary = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.stage === Stage.PRIMARY));
  const primary1st = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.subStage === SubStage["1pr"]));
  const primary2nd = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.subStage === SubStage["2pr"]));
  const primary3rd = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.subStage === SubStage["3pr"]));
  const primary4th = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.subStage === SubStage["4pr"]));
  const primary5th = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.subStage === SubStage["5pr"]));
  const primary6th = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.subStage === SubStage["6pr"]));

  const junior = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.stage === Stage.JUNIOR));
  const junior1st = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.subStage === SubStage["1ju"]));
  const junior2nd = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.subStage === SubStage["2ju"]));
  const junior3rd = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.subStage === SubStage["3ju"]));

  const secondary = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.stage === Stage.SECONDARY));
  const secondary1st = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.subStage === SubStage["1se"]));
  const secondary2nd = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.subStage === SubStage["2se"]));
  const secondary3rd = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.subStage === SubStage["3se"]));

  const collage = useSelector((state: RootState) => state.notes.AllNotes.filter((note) => note.stage === Stage.COLLAGE));

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<FullPage />} />
        <Route path="/side-notes" element={<PrintersSetting />} />

        <Route path="/notes" element={<AllNotes title="كل المذكرات" notes={allNote} />} />

        <Route path="/notes/stage/kg" element={<AllNotes title="KG" notes={kg} />} />
        <Route path="/notes/stage/kg/1" element={<AllNotes title="KG1" notes={kg1} />} />
        <Route path="/notes/stage/kg/2" element={<AllNotes title="KG2" notes={kg2} />} />

        <Route path="/notes/stage/primary" element={<AllNotes title="المرحلة الإبتدائية" notes={primary} />} />
        <Route path="/notes/stage/primary/1" element={<AllNotes title="أولى إبتدائي" notes={primary1st} />} />
        <Route path="/notes/stage/primary/2" element={<AllNotes title="تانية إبتدائي" notes={primary2nd} />} />
        <Route path="/notes/stage/primary/3" element={<AllNotes title="تالتة إبتدائي" notes={primary3rd} />} />
        <Route path="/notes/stage/primary/4" element={<AllNotes title="رابعة إبتدائي" notes={primary4th} />} />
        <Route path="/notes/stage/primary/5" element={<AllNotes title="خامسة إبتدائي" notes={primary5th} />} />
        <Route path="/notes/stage/primary/6" element={<AllNotes title="سادسة إبتدائي" notes={primary6th} />} />

        <Route path="/notes/stage/junior" element={<AllNotes title="المرحلة الإعدادية" notes={junior} />} />
        <Route path="/notes/stage/junior/1" element={<AllNotes title="أولى إعدادي" notes={junior1st} />} />
        <Route path="/notes/stage/junior/2" element={<AllNotes title="تانية إعدادي" notes={junior2nd} />} />
        <Route path="/notes/stage/junior/3" element={<AllNotes title="تالتة إعدادي" notes={junior3rd} />} />

        <Route path="/notes/stage/secondary" element={<AllNotes title="المرحلة الثانوية" notes={secondary} />} />
        <Route path="/notes/stage/secondary/1" element={<AllNotes title="أولى ثانوي" notes={secondary1st} />} />
        <Route path="/notes/stage/secondary/2" element={<AllNotes title="تانية ثانوي" notes={secondary2nd} />} />
        <Route path="/notes/stage/secondary/3" element={<AllNotes title="تالتة ثانوي" notes={secondary3rd} />} />

        <Route path="/notes/stage/collage" element={<AllNotes title="جامعة" notes={collage} />} />

        <Route path="/reservations" element={<Reservations />} />

        <Route path="/add/note" element={<NewNote />} />

        <Route path="/reserved-notes" element={<ReservedNotes />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

export default App;
