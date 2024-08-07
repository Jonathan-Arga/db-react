import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
	const navigate = useNavigate();
	useEffect(() => {
		let timeout = setTimeout(() => {
			navigate("/home");
		}, 1500);
		return () => clearTimeout(timeout);
	});
	return (
		<>
			<div>404: Not Found</div>
			<div>Redirecting back to home page...</div>
		</>
	);
}
