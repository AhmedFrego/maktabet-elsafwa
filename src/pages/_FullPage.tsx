import React from "react";

import { WelcomePage } from "pages/";

import { DescripedImg, Satge } from "components/";
import { TitledSection } from "components/layout";
import { stages } from "store/DUMMY-DATA/stages";

export const FullPage = () => {
	return (
		<>
			<WelcomePage />
			<TitledSection
				id="notes"
				passedClass="articles"
				extraClass="clickable"
				title="مذكرات"
				to="/notes"
				children={<DescripedImg Component={Satge} data={[stages, 0, 6]} />}
			/>
		</>
	);
};
