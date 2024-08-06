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
			<span className="layout">THIS PROJECT</span>
			<nav className="main-nav">
				<NavLink
					to="home"
					className={(isActive) =>
						isActive ? "nav-link" : "nav-link active"
					}
				>
					Home
				</NavLink>
				<NavLink
					to="todos"
					className={(isActive) =>
						isActive ? "nav-link" : "nav-link active"
					}
				>
					Todos
				</NavLink>
				<NavLink
					to="posts"
					className={(isActive) =>
						isActive ? "nav-link" : "nav-link active"
					}
				>
					Posts
				</NavLink>
				<NavLink
					to="albums"
					className={(isActive) =>
						isActive ? "nav-link" : "nav-link active"
					}
				>
					Albums
				</NavLink>
				<button onClick={signOut}>Sign out</button>
			</nav>
			<Outlet />
		</>
	);
}
