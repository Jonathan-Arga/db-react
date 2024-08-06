import { useEffect } from "react";
import { useFetch } from "../../util";

export default function Home() {
	const dataObj = useFetch();
	console.log(dataObj);

	useEffect(() => {
		dataObj.setRequest(`users/${localStorage.getItem("current")}`);
		console.log(dataObj);
	}, []);

	return dataObj.isLoading ? (
		<h1>Loading...</h1>
	) : (
		<h1>Welcome, {dataObj.data.name}</h1>
	);
}
