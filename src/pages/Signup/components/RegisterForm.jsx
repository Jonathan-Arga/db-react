/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState } from 'react';
import styles from './RegisterForm.module.css';
import { Navigate } from 'react-router-dom';

export default function RegisterForm() {
	const nameRef = useRef();
	const emailRef = useRef();
	const usernameRef = useRef();
	const passwordRef = useRef();
	const repeatPasswordRef = useRef();
	const errorRef = useRef();

	const [redirect, setRedirect] = useState();

	/**
	 * @param {React.FormEvent} e
	 */
	const submitHandler = (e) => {
		e.preventDefault();
		if (passwordRef.current.value != repeatPasswordRef.current.value)
			return (errorRef.current.textContent = "Passwords don't match!");
		fetch('http://localhost:3000/users')
			.then((res) => res.json())
			.then((data) => {
				if (
					data.find(
						(user) => user['username'] == usernameRef.current.value
					)
				)
					return (errorRef.current.textContent =
						'Username already exists!');
				fetch('http://localhost:3000/users', {
					method: 'POST',
					body: JSON.stringify({
						id: data.length + 1,
						name: nameRef.current.value,
						username: usernameRef.current.value,
						email: emailRef.current.value,
						website: passwordRef.current.value,
					}),
				}).then((res) => (res.ok ? setRedirect(true) : false));
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
			{redirect ? <Navigate to="/login"></Navigate> : <></>}
		</form>
	);
}
