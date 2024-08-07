import { Link, useNavigate } from "react-router-dom";
import styles from "../css/Albums.module.css";
import {
	Delete,
	DeletingContext,
} from "../../../Layout/SectionLayout/SectionLayout";
import { useContext } from "react";

export default function AlbumItem({ album }) {
	const [deletingAlbums] = useContext(DeletingContext);
	const navigate = useNavigate();

	function handleClick(e) {
		if (deletingAlbums) {
			Delete(album.id, navigate, "albums");
			window.location.reload();
			return;
		}
		navigate(`${album.id}/1`);
	}

	return (
		<li className={styles.albumItem} onClick={handleClick}>
			<h2 className={styles.albumTitle}>Album Title: {album.title}</h2>
			<p className={styles.albumId}>Album ID: {album.id}</p>
		</li>
	);
}
