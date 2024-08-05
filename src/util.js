import { useEffect, useState } from 'react';

const MAIN_URL = 'http://localhost:3000/';

function useFetch() {
	const [path, setPath] = useState('users');
	const [options, setOptions] = useState({ method: 'GET', data: {} });

	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [failed, setFailed] = useState(false);

	const setRequest = (
		newPath,
		newOptions = { method: 'GET', body: undefined }
	) => {
		setPath(newPath);
		setOptions(newOptions);
	};

	useEffect(() => {
		setIsLoading(true);
		setFailed(false);
		fetch(`${MAIN_URL}${path}`, options)
			.then((res) => {
				console.log(res);
				if (!res.ok) setFailed(true);
				return res.json();
			})
			.then((data) => {
				setData(data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				return err ? setFailed(true) : false;
			});
	}, [path, options]);

	return { setRequest, isLoading, failed, data };
}

export { useFetch };
