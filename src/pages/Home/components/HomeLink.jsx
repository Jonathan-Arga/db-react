import { Link, Outlet } from "react-router-dom";
import styles from "../../../Layout/MainLayout/MainLayout.module.css";

export default function HomeLink({ path }) {
	return (
		<Link to={`../${path}`} className={styles.homeLink}>
			<p>Look at your</p>
			<h2>{path}</h2>
		</Link>
	);
}
