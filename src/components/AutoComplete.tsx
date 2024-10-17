import React, { useState } from "react";

import { DataPassType, Input, inputProps } from "components/";
import { useInput } from "hooks/";

interface AutoCompleteProps extends inputProps {
	data?: ChoiseType[];
	dataHandler?: (choise: ChoiseType) => void;
}

export interface ChoiseType {
	value: string;
	text: string;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
	interface DataPassType {
		value: string;
		setValue: (value: string) => void;
		choosingState: boolean;
		setChoosingState: React.Dispatch<React.SetStateAction<boolean>>;
	}
	const [TextValue, setTextValue] = useState(null);
	const [isChoosing, setIsChoosing] = useState(null);

	const filteredList = props.data.filter((choise) => choise.text.includes(TextValue));

	const chooseHandler = (choise: ChoiseType) => {
		props.dataHandler(choise);
		setTextValue(choise.text);
	};

	const dataPassHandler = (dataPass: DataPassType) => {
		setTextValue(dataPass.value);
		setIsChoosing(dataPass.choosingState);
	};
	return (
		<div className="auto-complete">
			<Input label={props.label} invalidText={props.invalidText} resetable dataPass={dataPassHandler} value={TextValue} />
			{!!props.data && isChoosing && (
				<div className="auto-complete__list">
					{filteredList.map((choise) => (
						<p key={choise.value} className="auto-complete__list-item" onClick={() => chooseHandler(choise)}>
							{choise.text}
						</p>
					))}
				</div>
			)}
		</div>
	);
};
