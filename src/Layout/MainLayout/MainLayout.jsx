import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./MainLayout.module.css";

export default function Layout() {
	const navigate = useNavigate();

	function signOut() {
		if (!confirm("Are you sure you wanna sign out?")) return;
		localStorage.removeItem("current");
		navigate("/login");
	}

	return (
		<>
			<header className={styles.header}>
				<span className={styles.headerName}>THIS PROJECT</span>
				<nav className={styles.mainNav}>
					<NavLink
						to="home"
						className={({ isActive }) =>
							isActive
								? `${styles.navLink} ${styles.active}`
								: `${styles.navLink}`
						}
					>
						Home
					</NavLink>
					<NavLink
						to="todos"
						className={({ isActive }) =>
							isActive
								? `${styles.navLink} ${styles.active}`
								: `${styles.navLink}`
						}
					>
						Todos
					</NavLink>
					<NavLink
						to="posts"
						className={({ isActive }) =>
							isActive
								? `${styles.navLink} ${styles.active}`
								: `${styles.navLink}`
						}
					>
						Posts
					</NavLink>
					<NavLink
						to="albums"
						className={({ isActive }) =>
							isActive
								? `${styles.navLink} ${styles.active}`
								: `${styles.navLink}`
						}
					>
						Albums
					</NavLink>
					<button onClick={signOut} className={styles.signoutButton}>
						Sign out
					</button>
				</nav>
			</header>
			<Outlet />
		</>
	);
}
