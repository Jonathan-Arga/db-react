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
		}
		getData(`users/${localStorage.getItem("current")}`, setUser);
	}, []);

	return user ? (
		<div className={styles.infoContainer}>
			<p>
				<span>Name:</span> {user.name}
			</p>
			<p>
				<span>Username:</span> {user.username}
			</p>
			<p>
				<span>Email:</span> {user.email}
			</p>
			<p>
				<span>Website:</span> {user.website}
			</p>
		</div>
	) : (
		<h1>Loading...</h1>
	);
}
