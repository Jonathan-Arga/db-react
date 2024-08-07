export default function NotFound() {
	const navigate = useNavigate();
	useEffect(() => {
		setTimeout(() => {
			navigate('/home')
		}, 1500);
		return ()=>
	})
	return (
		<>
			<div>404: Not Found</div>
			<div>Redirecting back to home page...</div>
		</>
	);
}
