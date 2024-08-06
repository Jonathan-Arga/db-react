import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getData } from "../../util";
import styles from "../../pages/Albums/css/Albums.module.css";

export default function AlbumPageLayout() {
	const { albumid } = useParams();
	const [album, setAlbum] = useState(null);

	useEffect(() => {
		getData(`albums/${albumid}`, setAlbum);
	}, []);
	return (
		<>
			<h2 className={styles.layoutHeader}>
				Album: {album && album.title}
			</h2>
			<Outlet />
		</>
	);
}
