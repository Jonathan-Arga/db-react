/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from 'react';
import { useFetch } from '../../../util';
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
	const nameRef = useRef();
	const emailRef = useRef();
	const usernameRef = useRef();
	const passwordRef = useRef();
	const repeatPasswordRef = useRef();

	const users = useFetch();
	const postData = useFetch();

	/**
	 * @param {React.FormEvent} e
	 */
	const submitHandler = (e) => {
		e.preventDefault();
	};
	useEffect(() => {
		postData.setRequest('users', {
			method: 'POST',
			body: {
				'id': users.data.length,
				'name': nameRef.current.value,
				'username': usernameRef.current.value,
				'email': emailRef.current.value,
				'website': passwordRef.current.value,
			},
		});
	});
	return (
		<form className={styles.signupForm} onSubmit={submitHandler}>
			<input ref={nameRef} type='text' placeholder='Full Name' />
			<input ref={usernameRef} type='text' placeholder='Username' />
			<input ref={emailRef} type='email' placeholder='Email here' />
			<input
				ref={passwordRef}
				name='password'
				type='password'
				placeholder='Password here'
			/>
			<input
				ref={repeatPasswordRef}
				name='same-password'
				type='password'
				placeholder='Repeat password here'
			/>
			<button onSubmit={submitHandler}>Sign Up</button>
		</form>
	);
}
