import { useState } from 'react';

const MAIN_URL = 'https://localhost:3000/';

function useFetch(path, options = { method: 'GET', data: {} }) {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [failed, setFailed] = useState(false);

	try {
		setIsLoading(true);
		setFailed(false);
		fetch(`${MAIN_URL}/${path}`, {
			method: options.method,
			body: options.data,
		})
			.then((res) => {
				if (!res.ok) setFailed(true);
				return res.json();
			})
			.then((data) => {
				setData(data);
				setIsLoading(false);
			})
			.catch((err) => (err ? setFailed(true) : false));
	} catch (err) {
		console.error(err);
		setFailed(true);
	}
	return { isLoading, failed, data };
}

export { useFetch };
