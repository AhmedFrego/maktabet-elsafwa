import React, { FC, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState ,modalActions} from "../../store";

export const Modal: FC = ({ children }) => {
  const show = useSelector((state: RootState) => state.modal.showModal);
  const ModelContent: (new () => React.Component<any, any>) | null = useSelector((state: RootState) => state.modal.modalContent);
  const dispatch = useDispatch();
  const closeModel = (e: FormEvent) => dispatch(modalActions.closeModel());
  const disablePropagation = (e: FormEvent) => e.stopPropagation();
  return (
    <>
      {show && (
        <div className="modal" onClick={closeModel}>
          <p>دوس ف أي حتة</p>
          <div className="modal__content" onClick={disablePropagation}>
            {ModelContent && <ModelContent />}
          </div>
        </div>
      )}
    </>
  );
};

