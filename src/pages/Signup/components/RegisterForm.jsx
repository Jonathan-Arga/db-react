/* eslint-disable react-hooks/rules-of-hooks */
import { useFetch } from '../../../util';

export default function RegisterForm() {
	const fetch = useFetch('/');
	/**
	 *
	 * @param {React.FormEvent} e
	 */
	const submitHandler = (e) => {
		e.preventDefault();
		fetch.setRequest('users');
	};
	return (
		<form onSubmit={(e) => submitHandler(e)}>
			<button>button</button>
			{JSON.stringify(fetch)}
		</form>
	);
}
