import { useEffect } from "react";
import { checkLoggedIn, useFetch } from "../../util";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const dataObj = useFetch();
	console.log(dataObj);
	const navigate = useNavigate();

	useEffect(() => {
		const currentUser = checkLoggedIn();
		if (!currentUser) return;
		dataObj.setRequest(`users/${currentUser}`);
	}, []);

	return dataObj.isLoading ? (
		<h1>Loading...</h1>
	) : (
		<h1>Welcome, {dataObj.data.name}</h1>
	);
}
