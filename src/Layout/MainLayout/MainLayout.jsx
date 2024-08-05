import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
	const navigate = useNavigate();

	function signOut() {
		if (!confirm("Are you sure you wanna sign out?")) return;
		localStorage.removeItem("current");
		navigate("/login");
	}

	return (
		<>
			<nav>
				<NavLink to="home">Home</NavLink>
				<NavLink to="todos">Todos</NavLink>
				<NavLink to="posts">Posts</NavLink>
				<NavLink to="albums">Albums</NavLink>
				<button onClick={signOut}>Sign out</button>
			</nav>
			<Outlet />
		</>
	);
}
