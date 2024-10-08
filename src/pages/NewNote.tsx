import React, { FC, FormEvent, useState } from "react";
import Input from "../components/Input";
import { useInput } from "../hooks/use-input";

import notesActions from "../store/notes-slice";
import modalActions from "../store/modal-slice";
import statusActions, { status } from "../store/status-slice";

import { NoteClass, Stage, SubStageText } from "../models/NoteClass";
import { useDispatch } from "react-redux";

import { getArabicNumbers } from "../functions/getArabicNumbers";

import { noteManager } from "../store/database/notes-manager";

const NewNote: FC<{ note?: NoteClass }> = (props) => {
  const lastSubStage = localStorage.getItem("subStage") ? +localStorage.getItem("subStage")! : 0;
  const currentYear = localStorage.getItem("year") || "2023";

  const dispatch = useDispatch();
  const [subStage, setSubSatge] = useState(props.note ? props.note.subStage : lastSubStage);
  const [stage, setSatge] = useState(props.note ? props.note.stage : Stage.SECONDARY);
  const [year, setYear] = useState(props.note ? props.note.year : currentYear);
  const [confirmedRemove, setConfirmedRemove] = useState(false);

  const stageChangeHandler = (e: FormEvent<HTMLSelectElement>) => {
    setSubSatge(+e.currentTarget.value);

    if (+e.currentTarget.value < 6) setSatge(Stage.PRIMARY);
    if (+e.currentTarget.value >= 6 && +e.currentTarget.value < 9) setSatge(Stage.JUNIOR);
    if (+e.currentTarget.value >= 9 && +e.currentTarget.value < 12) setSatge(Stage.SECONDARY);
    if (+e.currentTarget.value >= 12 && +e.currentTarget.value < 14) setSatge(Stage.KG);
    if (+e.currentTarget.value === 14) setSatge(Stage.COLLAGE);
  };

  const yearChangrHandler = (e: FormEvent<HTMLSelectElement>) => setYear(e.currentTarget.value);

  const {
    blurHandler: subjectBlurHandler,
    changeHandler: subjectChangrHandler,
    focusHandler: subjectFocusHandler,
    isValid: subjectIsValid,
    resetValue: subjectResetValue,
    value: subjectValue,
    containerClass: subjectContainerCalss,
  } = useInput({ validate: (x) => x.trim().length > 0, className: "input", startValue: props.note ? props.note.name : "" });

  const {
    blurHandler: teacherBlurHandler,
    changeHandler: teacherChangrHandler,
    focusHandler: teacherFocusHandler,
    isValid: teacherIsValid,
    resetValue: teacherResetValue,
    value: teacherValue,
    containerClass: teacherContainerCalss,
  } = useInput({ validate: (x) => x.trim().length > 0, className: "input", startValue: props.note ? props.note.teacher : "" });

  const {
    blurHandler: coverBlurHandler,
    changeHandler: coverChangrHandler,
    focusHandler: coverFocusHandler,
    isValid: coverIsValid,
    resetValue: coverResetValue,
    value: coverValue,
    containerClass: coverContainerClass,
  } = useInput({ validate: (x) => x.trim().length > 0, className: "input", startValue: props.note ? props.note.cover : "" });

  const {
    blurHandler: priceBlurHandler,
    changeHandler: priceChangrHandler,
    focusHandler: priceFocusHandler,
    resetValue: priceResetValue,
    value: priceValue,
    containerClass: priceContainerCalss,
    isValid: priceIsValid,
  } = useInput({ validate: (x) => x > 0, className: "input", startValue: props.note ? props.note.price.toString() : "" });

  let note: NoteClass = props.note
    ? {
        id: props.note.id,
        cover: coverValue,
        favorited: props.note.favorited,
        name: subjectValue,
        price: +priceValue,
        printed: props.note.printed,
        reserved: props.note.reserved,
        stage: stage,
        subStage: subStage,
        subStageText: SubStageText[subStage],
        teacher: teacherValue,
        year: +year,
        path: "/",
      }
    : new NoteClass(subjectValue, teacherValue, 0, 0, coverValue, stage, subStage, SubStageText[subStage], +year, false, +priceValue, "/");
  const addNoteHandler = (e: FormEvent) => {
    e.preventDefault();
    subjectBlurHandler();
    coverBlurHandler();
    teacherBlurHandler();
    priceBlurHandler();


    if (subjectIsValid && coverIsValid && teacherIsValid && priceIsValid) {
      noteManager(note);

      dispatch(notesActions.addNote(note));
      dispatch(modalActions.closeModel());
      dispatch(
        statusActions.setStatus({
          status: status.GREEN,
          message: `تم ${props.note ? "تعديل" : "إضافة"} مذكرة ${subjectValue + " " + SubStageText[subStage]} بنجاح`,
          time: "1.5s",
        })
      );
      setTimeout(() => dispatch(statusActions.setStatus({ status: status.BLUE, message: " " })), 1500);

      localStorage.setItem("subStage", subStage.toString());
      localStorage.setItem("year", year.toString());

      subjectResetValue();
      teacherResetValue();
      coverResetValue();
      priceResetValue();
    }
  };

  const removeNoteHandler = () => {
    if (confirmedRemove) {
      dispatch(notesActions.removeNote(props.note?.id));
      dispatch(modalActions.closeModel());
      dispatch(
        statusActions.setStatus({
          status: status.GREEN,
          message: `تم حذف مذكرة ${subjectValue + " " + SubStageText[subStage]} بنجاح`,
          time: "1.5s",
        })
      );
      setTimeout(() => dispatch(statusActions.setStatus({ status: status.BLUE, message: " " })), 1500);
    }
    if (!confirmedRemove) setConfirmedRemove(true);
  };

  return (
    <form className={props.note ? "" : "container flex flex--column"} onSubmit={addNoteHandler}>
      <Input
        containerClass={subjectContainerCalss + " input--form"}
        inputClass="input__input"
        label="إسم المادة"
        labelClass="input__label"
        value={subjectValue}
        changeHandler={subjectChangrHandler}
        blurHandler={subjectBlurHandler}
        focusHandler={subjectFocusHandler}
        invalidText="إسم المادة يا هندسة😁😁"
      />
      <Input
        containerClass={teacherContainerCalss + " input--form"}
        inputClass="input__input"
        label="إسم المدرس"
        labelClass="input__label"
        value={teacherValue}
        changeHandler={teacherChangrHandler}
        blurHandler={teacherBlurHandler}
        focusHandler={teacherFocusHandler}
        invalidText="حط إسمي عادي😇😇"
      />
      <Input
        containerClass={coverContainerClass + " input--form"}
        inputClass="input__input"
        label="لينك الغلاف"
        labelClass="input__label"
        value={coverValue}
        changeHandler={coverChangrHandler}
        blurHandler={coverBlurHandler}
        focusHandler={coverFocusHandler}
        invalidText="خد غلاف الصفوة كوبي✌️✌️"
        invalidTextClickHandler={() =>
          navigator.clipboard.writeText(
            "https://scontent.fcai21-3.fna.fbcdn.net/v/t1.6435-9/83028220_2611606682393140_8274889729997012992_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=825194&_nc_ohc=AVWc2g9ithQAX_gphYt&_nc_ht=scontent.fcai21-3.fna&oh=00_AT9N8QM7tUDMp2UCxHMC7TYESicNmJ48_FlTLfzKJ14K7w&oe=6311AD41"
          )
        }
      />
      <select className="input input__input input--form" value={subStage} onChange={stageChangeHandler}>
        <optgroup label="المرحلة الثانوية">
          <option value="9">أولى ثانوي</option>
          <option value="10">تانية ثانوي</option>
          <option value="11">تالتة ثانوي</option>
        </optgroup>
        <optgroup label="المرحلة الإعدادية">
          <option value="6">أولى إعدادي</option>
          <option value="7">تانية إعدادي</option>
          <option value="8">تالتة إعدادي</option>
        </optgroup>
        <optgroup label="المرحلة الإبتدائية">
          <option value="0">اولى إبتدائي</option>
          <option value="1">تانية إبتدائي</option>
          <option value="2">تالتة إبتدائي</option>
          <option value="3">رابعة إبتدائي</option>
          <option value="4">خامسة إبتدائي</option>
          <option value="5">سادسة إبتدائي</option>
        </optgroup>

        <optgroup label="*******************************">
          <option value="12">KG1</option>
          <option value="13">KG2</option>
          <option value="14">جامعة</option>
        </optgroup>
      </select>
      <select className="input input__input input--form" value={year} onChange={yearChangrHandler}>
        <option value="2020">{getArabicNumbers(2020)}</option>
        <option value="2021">{getArabicNumbers(2021)}</option>
        <option value="2022">{getArabicNumbers(2022)}</option>
        <option value="2023">{getArabicNumbers(2023)}</option>
        <option value="2024">{getArabicNumbers(2024)}</option>
        <option value="2025">{getArabicNumbers(2025)}</option>
        <option value="2026">{getArabicNumbers(2026)}</option>
        <option value="2027">{getArabicNumbers(2027)}</option>
      </select>
      <Input
        containerClass={priceContainerCalss + " input--form"}
        inputClass="input__input"
        label="السعر"
        type="number"
        labelClass="input__label"
        value={priceValue}
        changeHandler={priceChangrHandler}
        blurHandler={priceBlurHandler}
        focusHandler={priceFocusHandler}
        invalidText="مفيش حاجة ببلاش👿👿"
      />
      <button className="btn--main btn" type="submit">
        {props.note ? "تأكيد التعديل" : "إضافة"}
      </button>
      {props.note && (
        <button className="btn--main btn btn--red" type="button" onClick={removeNoteHandler}>
          {confirmedRemove ? "هل أنت متأكد" : "حذف المذكرة"}
        </button>
      )}
    </form>
  );
};

export default NewNote;
