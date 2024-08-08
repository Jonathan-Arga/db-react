import { useEffect, useState } from "react";
import { checkLoggedIn, getData } from "../../util";
import { useNavigate } from "react-router-dom";
import styles from "./Info.module.css";

export default function Info() {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const currentUser = checkLoggedIn();
		if (!currentUser) {
			navigate("/login");
		} else getData(`users/${localStorage.getItem("current")}`, setUser);
	}, []);

	return user ? (
		<div className={styles.infoContainer}>
			<fieldset>
				<legend>Name</legend> {user.name}
			</fieldset>
			<fieldset>
				<legend>Username</legend> {user.username}
			</fieldset>
			<fieldset>
				<legend>Email</legend> {user.email}
			</fieldset>
			<fieldset>
				<legend>Website</legend> {user.website}
			</fieldset>
		</div>
	) : (
		<h1>Loading...</h1>
	);
}
