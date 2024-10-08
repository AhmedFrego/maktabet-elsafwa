import { FC } from "react";
import Header from "./Header/Header";

import Modal from "../UI/Modal";

import Reserving from "../UI/ReservingBar";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { status as STATUS } from "../../store/status-slice";
const Layout: FC = ({ children }) => {
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
        <img src={require("../../assets/imgs/safwa.png")} alt="full logo" />
      </div>
      {statusMessage.length > 10 && (
        <div className={statusClass} style={{ animationDuration: time }}>
          <p>{statusMessage}</p>
        </div>
      )}
      <Modal />
      <Header />
      <main>{children}</main>

      <Reserving />
    </>
  );
};

export default Layout;
