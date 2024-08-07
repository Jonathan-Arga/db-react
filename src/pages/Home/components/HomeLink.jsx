import { Link, Outlet } from "react-router-dom";

export default function HomeLink({ path, name }) {
	return (
		<Link to={path}>
			<p>Look at your</p>
			<h2>{path}</h2>
		</Link>
	);
}
