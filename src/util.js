import { useState } from 'react';

const MAIN_URL = 'https://localhost:3000/';

function useFetch(path, bodyData = undefined) {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [failed, setFailed] = useState(false);

	let sendMethod = 'GET';

	if (bodyData) sendMethod = 'POST';

	try {
		setIsLoading(true);
		setFailed(false);
		fetch(`${MAIN_URL}/${path}`, { method: sendMethod, body: bodyData })
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
