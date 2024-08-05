
import { useEffect, useRef, useState } from 'react';

const MAIN_URL = 'http://localhost:3000/';

export const useIsMount = () => {
	const isMountRef = useRef(true);
	useEffect(() => {
		isMountRef.current = false;
	}, []);
	return isMountRef.current;
};

function useFetch() {
	const isMount = useIsMount();
	const [path, setPath] = useState('');
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
		if (isMount) return;
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
