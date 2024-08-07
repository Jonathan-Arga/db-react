import { useEffect } from "react";
import { checkLoggedIn, useFetch } from "../../util";
import { useNavigate } from "react-router-dom";
import styles from "../../Layout/MainLayout/MainLayout.module.css";
import HomeLink from "./components/HomeLink";

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
		<>
			<h1>Welcome, {dataObj.data.name}</h1>
			<p>Would you like to...</p>
			<div className={styles.homeLinkContainer}>
				<HomeLink path="todos" className={styles.homeLink} />
				<HomeLink path="posts" className={styles.homeLink} />
				<HomeLink path="albums" className={styles.homeLink} />
			</div>
		</>
	);
}
