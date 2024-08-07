import { useNavigate } from "react-router-dom";
import { checkLoggedIn } from "../../util";
import { useEffect } from "react";

export default function NavigateHome() {
	const navigate = useNavigate();

	useEffect(() => {
		if (checkLoggedIn()) {
			navigate("/home");
		} else {
			navigate("/login");
		}
	}, []);
}
