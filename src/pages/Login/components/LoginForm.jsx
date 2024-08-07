import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MAIN_URL } from "../../../App";

import styles from "./LoginForm.module.css";

export default function LoginForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorText, setErrorText] = useState("");
	const navigate = useNavigate();

	async function submitLogin(e) {
		e.preventDefault();
		const res = await fetch(MAIN_URL + "users");
		const data = await res.json();
		const myUser = data.filter((user) => user.username === username);
		if (myUser.length === 0) {
			setErrorText("Username not Found");
			setUsername("");
			setPassword("");
			return;
		}
		if (myUser[0].website !== password) {
			setErrorText("Incorrect password");
			setPassword("");
			return;
		}
		localStorage.setItem("current", myUser[0].id);
		navigate("/home");
	}

	return (
		<form onSubmit={submitLogin}>
			<fieldset className={styles.loginForm}>
				<legend>Login</legend>
				<input
					type="text"
					name="username"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button>LOGIN</button>
				<p>{errorText}</p>
			</fieldset>
		</form>
	);
}
