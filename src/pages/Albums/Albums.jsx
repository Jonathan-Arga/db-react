import { useEffect, useRef, useState } from "react";
import { checkLoggedIn, getData } from "../../util";
import { useNavigate, useSearchParams } from "react-router-dom";
import AlbumItem from "./components/AlbumItem";
import AlbumSearch from "./components/AlbumSearch";
import AddAlbum from "./components/AddAlbum";
import styles from "./css/Albums.module.css";

export default function Albums() {
	const navigate = useNavigate();
	let userRef = useRef(null);
	const [albums, setAlbums] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();

	const userAlbums =
		albums && albums.filter((album) => album.userId == userRef.current);

	const filteredAlbums =
		userAlbums &&
		userAlbums.filter((album) => {
			const id = searchParams.get("id");
			const title = searchParams.get("title");
			if (id) {
				return album.id == id;
			}
			if (title) {
				return album.title.includes(title);
			}
			return true;
		});

	useEffect(() => {
		userRef.current = checkLoggedIn();
		if (!userRef.current) {
			navigate("../login");
		}
		getData("albums", setAlbums);
	}, []);

	return (
		<>
			<AlbumSearch />
			<ul className={styles.albumList}>
				{filteredAlbums ? (
					filteredAlbums.map((album) => (
						<AlbumItem key={album.id} album={album} />
					))
				) : (
					<h1>Loading...</h1>
				)}
			</ul>
		</>
	);
}
