/* eslint-disable react-hooks/rules-of-hooks */
import { useRef } from "react";
import styles from "./RegisterForm.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { MAIN_URL } from "../../../App";

export default function RegisterForm() {
	const nameRef = useRef();
	const emailRef = useRef();
	const usernameRef = useRef();
	const passwordRef = useRef();
	const repeatPasswordRef = useRef();
	const errorRef = useRef();
	const navigate = useNavigate();

	/**
	 * @param {React.FormEvent} e
	 */
	const submitHandler = (e) => {
		e.preventDefault();
		if (passwordRef.current.value != repeatPasswordRef.current.value)
			return (errorRef.current.textContent = "Passwords don't match!");
		fetch(MAIN_URL + "users")
			.then((res) => res.json())
			.then((data) => {
				if (
					data.find(
						(user) => user["username"] == usernameRef.current.value
					)
				)
					return (errorRef.current.textContent =
						"Username already exists!");
				const myUser = {
					id: (data.length + 1).toString(),
					name: nameRef.current.value,
					username: usernameRef.current.value,
					email: emailRef.current.value,
					website: passwordRef.current.value,
				};
				fetch(MAIN_URL + "users", {
					method: "POST",
					body: JSON.stringify(myUser),
				}).then((res) => {
					if (res.ok) {
						localStorage.setItem("current", myUser.id);
						navigate("/home");
					}
				});
			});
	};

	return (
		<form onSubmit={submitHandler}>
			<fieldset className={styles.signupForm}>
				<legend>Signup</legend>
				<input
					ref={nameRef}
					type="text"
					placeholder="Full Name"
					required
				/>
				<input
					ref={usernameRef}
					type="text"
					placeholder="Username"
					required
				/>
				<input
					ref={emailRef}
					className={styles.alone}
					type="email"
					placeholder="Email here"
					required
				/>
				<input
					ref={passwordRef}
					name="password"
					type="password"
					placeholder="Password here"
					required
				/>
				<input
					ref={repeatPasswordRef}
					name="same-password"
					type="password"
					placeholder="Repeat password here"
					required
				/>
				<button onSubmit={submitHandler}>Sign Up</button>
				<br />
				<p className={styles.alone} ref={errorRef}></p>
			</fieldset>
			{localStorage.getItem("current") ? (
				<Navigate to="/home"></Navigate>
			) : (
				false
			)}
		</form>
	);
}
