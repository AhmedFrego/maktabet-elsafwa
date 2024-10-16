import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TitledSection } from "components/layout";

import { Note } from "components/";
import { NoteClass } from "models/NoteClass";
import { StagesNav, NoItems } from "components/UI";
import { RootState } from "store/store";

import { searchActions } from "store/";

interface NotesProps {
	title: string;
	notes: NoteClass[];
}

export const Notes: React.FC<NotesProps> = (props) => {
	const dispatch = useDispatch();
	const noItems = useSelector((state: RootState) => state.search.noItems);

	const filterValue = useSelector((state: RootState) => state.search.value);

	const filterdNotes = props.notes.filter(
		(note) => note.name.includes(filterValue) || note.subStageText.includes(filterValue) || note.teacher.includes(filterValue)
	);

	if (props.notes.length !== 0 && filterdNotes.length === 0) dispatch(searchActions.noItemsHandler(true));
	if (filterdNotes.length !== 0) dispatch(searchActions.noItemsHandler(false));

	return (
		<TitledSection passedClass="articles" id="primary" title={props.title}>
			<StagesNav />
			{noItems && <NoItems text="المذكرة التي طلبتها غير متاحة حاليا🧐🧐" />}
			{props.notes.length === 0 && (
				<NoItems text={`معقولة معندناش مذكرات ${props.title !== "كل المذكرات" ? props.title : ""} خالص😨😨`} />
			)}
			{filterdNotes.map((note) => (
				<Note note={note} key={note.id} />
			))}
		</TitledSection>
	);
};
