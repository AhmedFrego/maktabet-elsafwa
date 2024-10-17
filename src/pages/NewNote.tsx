import React from "react";
import { useDispatch } from "react-redux";

import { Input, AutoComplete, ChoiseType } from "components/";
import { useInput } from "hooks/use-input";

import { Tables, TablesInsert } from "database.types";

import { NoteClass, Stage, SubStageText } from "models/NoteClass";

import { getArabicNumbers } from "functions/getArabicNumbers";

import { notesActions, modalActions, supabase } from "store/";
import { statusBarActions, status } from "store/status-slice";
import { noteManager } from "store/database/notes-manager";

export const NewNote: React.FC<{ note?: NoteClass }> = (props) => {
	const insertNote = async (note: TablesInsert<"notes">) => {
		const { error } = await supabase.from("notes").insert(note);
		if (error) throw new Error(error.message);
	};

	const [subjects, setSubjects] = React.useState<Tables<"subjects">[]>([]);

	const retrieveSubjects = async () => {
		const { data, error } = await supabase.from("subjects").select();
		setSubjects(data);
	};

	React.useEffect(() => {
		retrieveSubjects();
	});

	const addNoteHandler = (e: React.FormEvent) => {
		e.preventDefault();
		subjectBlurHandler();
		coverBlurHandler();
		teacherBlurHandler();
		priceBlurHandler();

		insertNote({
			academic_year: "73c27a8f-8565-4592-88aa-22cbef717a3d",
			default_paper: "4f8fafe5-2c9c-4fd1-b5ad-29527f910206",
			subject: "00277bcf-4538-4be6-8f82-14c1aa3e447d",
			teacher: "c250bc6b-48fe-43dc-a713-c1fb7a3e88e6",
			// created_by: "53b0e1b4-b824-46f3-b96b-22c63807491c",
			term: "3cc75075-0067-49ec-8c5a-ca5dd6439618",
		}).catch();

		if (subjectIsValid && coverIsValid && teacherIsValid && priceIsValid) {
			noteManager(note);

			dispatch(notesActions.addNote(note));
			dispatch(modalActions.closeModel());
			dispatch(
				statusBarActions.setStatus({
					status: status.GREEN,
					message: `تم ${props.note ? "تعديل" : "إضافة"} مذكرة ${subjectValue + " " + SubStageText[subStage]} بنجاح`,
					time: "1.5s",
				})
			);
			setTimeout(() => dispatch(statusBarActions.setStatus({ status: status.BLUE, message: " " })), 1500);

			localStorage.setItem("subStage", subStage.toString());
			localStorage.setItem("year", year.toString());

			subjectResetValue();
			teacherResetValue();
			coverResetValue();
			priceResetValue();
		}
	};

	const lastSubStage = localStorage.getItem("subStage") ? +localStorage.getItem("subStage")! : 0;
	const currentYear = localStorage.getItem("year") || "2023";

	const dispatch = useDispatch();
	const [subStage, setSubSatge] = React.useState(props.note ? props.note.subStage : lastSubStage);
	const [stage, setSatge] = React.useState(props.note ? props.note.stage : Stage.SECONDARY);
	const [year, setYear] = React.useState(props.note ? props.note.year : currentYear);
	const [confirmedRemove, setConfirmedRemove] = React.useState(false);

	const stageChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
		setSubSatge(+e.currentTarget.value);

		if (+e.currentTarget.value < 6) setSatge(Stage.PRIMARY);
		if (+e.currentTarget.value >= 6 && +e.currentTarget.value < 9) setSatge(Stage.JUNIOR);
		if (+e.currentTarget.value >= 9 && +e.currentTarget.value < 12) setSatge(Stage.SECONDARY);
		if (+e.currentTarget.value >= 12 && +e.currentTarget.value < 14) setSatge(Stage.KG);
		if (+e.currentTarget.value === 14) setSatge(Stage.COLLAGE);
	};

	const yearChangrHandler = (e: React.FormEvent<HTMLSelectElement>) => setYear(e.currentTarget.value);

	const {
		blurHandler: subjectBlurHandler,
		changeHandler: subjectChangrHandler,
		focusHandler: subjectFocusHandler,
		isValid: subjectIsValid,
		resetValue: subjectResetValue,
		value: subjectValue,
		containerClass: subjectContainerCalss,
		active: subjectInputIsActive,
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
		: new NoteClass(
				subjectValue,
				teacherValue,
				0,
				0,
				coverValue,
				stage,
				subStage,
				SubStageText[subStage],
				+year,
				false,
				+priceValue,
				"/"
		  );

	const removeNoteHandler = () => {
		if (confirmedRemove) {
			dispatch(notesActions.removeNote(props.note?.id));
			dispatch(modalActions.closeModel());
			dispatch(
				statusBarActions.setStatus({
					status: status.GREEN,
					message: `تم حذف مذكرة ${subjectValue + " " + SubStageText[subStage]} بنجاح`,
					time: "1.5s",
				})
			);
			setTimeout(() => dispatch(statusBarActions.setStatus({ status: status.BLUE, message: " " })), 1500);
		}
		if (!confirmedRemove) setConfirmedRemove(true);
	};

	const [subjectChoise, setSubjectChoise] = React.useState<ChoiseType>();
	const subjectHandler = (choise: ChoiseType) => {
		setSubjectChoise(choise);
	};

	const [subjectError, setSubjectError] = React.useState("حط إسمي عادي😇😇");
	const subjectCreateHandler = async (value: string) => {
		const { error,data } = await supabase.from("subjects").insert({ name: value }).select();
		error && setSubjectError(error.message);
		console.log(error)
	};

	return (
		<form className={props.note ? "" : "container flex flex--column"} onSubmit={addNoteHandler}>
			<Input
				label="إسم المادة"
				invalidText={subjectError}
				data={subjects.map((subject) => ({
					text: subject.name,
					value: subject.id,
				}))}
				dataHandler={subjectHandler}
				resetable
				canCreateChoise
				createChoise={subjectCreateHandler}
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
