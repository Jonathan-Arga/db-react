/* eslint-disable react-hooks/rules-of-hooks */
import { useFetch } from '../../../util';
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
	//const fetch = useFetch();
	/**
	 * @param {React.FormEvent} e
	 */
	const submitHandler = (e) => {
		e.preventDefault();
		fetch.setRequest('users');
	};
	console.log('rendered');
	return (
		<form className={styles.signupForm}>
			<input name='email' type='email' placeholder='Email here' />
			<input
				name='password'
				type='password'
				placeholder='Password here'
			/>
			<input
				name='same-password'
				type='password'
				placeholder='Repeat password here'
			/>
			<button value='Submit' onSubmit={submitHandler} />
		</form>
	);
}
