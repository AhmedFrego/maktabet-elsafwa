import { useSelector } from "react-redux";

import { LogoMain, NavLinks, SearchInput } from "./";

import { status ,RootState} from "store/";

export const Header = () => {
	const statusBar = useSelector((state: RootState) => state.statusBar.status);

	let statusBarCalss = "";
	if (statusBar === status.RED) {
		statusBarCalss = "status-bar status-bar--red";
	} else if (statusBar === status.GREEN) {
		statusBarCalss = "status-bar status-bar--green";
	} else {
		statusBarCalss = "status-bar";
	}
	return (
		<header className="header">
			<LogoMain className="header__logo" />

			<SearchInput />
			<NavLinks />
			<div className={statusBarCalss} />
		</header>
	);
};

