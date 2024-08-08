import { useEffect, useState } from "react";
import { checkLoggedIn, getData, useFetch } from "../../util";
import { useNavigate } from "react-router-dom";
import styles from "../../Layout/MainLayout/MainLayout.module.css";
import HomeLink from "./components/HomeLink";

export default function Home() {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const currentUser = checkLoggedIn();
		if (!currentUser) {
			navigate("/login");
		} else getData(`users/${localStorage.getItem("current")}`, setUser);
	}, []);

	return user ? (
		<>
			<h1>Welcome, {user.name}</h1>
			<p>Would you like to...</p>
			<div className={styles.homeLinkContainer}>
				<HomeLink path="todos" />
				<HomeLink path="posts" />
				<HomeLink path="albums" />
			</div>
		</>
	) : (
		<h1>Loading...</h1>
	);
}
