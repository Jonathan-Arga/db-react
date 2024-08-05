import { useState } from 'react';

const MAIN_URL = 'https://localhost:3000/';
function useFetch(path) {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	try {
		setIsLoading(true);
		fetch(`${MAIN_URL}/${path}`)
			.then((res) => {
				if (!res.ok) throw res;
				return res.json();
			})
			.then((data) => {
				setData(data);
				setIsLoading(false);
			});
	} catch (err) {
		console.error(err);
	}
	return { isLoading, data };
}

export { useFetch };
