import { Link } from "react-router-dom";
import styles from "../css/Albums.module.css";

export default function AlbumItem({ album }) {
	return (
		<li className={styles.albumItem}>
			<Link to={`${album.id}/1`}>
				<h2 className={styles.albumTitle}>
					Album Title: {album.title}
				</h2>
				<p className={styles.albumId}>Album ID: {album.id}</p>
			</Link>
		</li>
	);
}
