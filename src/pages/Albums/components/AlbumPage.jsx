import { useEffect, useRef, useState } from "react";
import {
	Link,
	useNavigate,
	useOutletContext,
	useParams,
} from "react-router-dom";
import { checkLoggedIn, getData } from "../../../util";
import AddPhoto from "./AddPhoto";
import DeletePhoto from "./DeletePhoto";
import styles from "../css/Albums.module.css";
const PHOTOS_PER_PAGE = 10;

export default function AlbumPage() {
	const { albumid, pageid } = useParams();
	const [albumId, pageId] = [parseInt(albumid), parseInt(pageid)];
	const [photos, setPhotos] = useState(null);
	const userRef = useRef(null);
	const [album, setAlbum] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		userRef.current = checkLoggedIn();
		if (!userRef.current) {
			navigate("/login");
		}
		getData(`albums/${albumId}`, setAlbum);
		getData(`photos`, setPhotos);
	}, []);

	const albumPhotos =
		photos && photos.filter((photo) => photo.albumId == albumId);
	const pagePhotos =
		albumPhotos &&
		albumPhotos.filter(
			(_, index) =>
				index >= (pageId - 1) * PHOTOS_PER_PAGE &&
				index < pageId * PHOTOS_PER_PAGE
		);

	const showNextPageButon =
		pagePhotos &&
		pagePhotos.length + (pageId - 1) * PHOTOS_PER_PAGE < albumPhotos.length;

	return (
		<>
			<h2>Album: {album && album.title}</h2>
			<AddPhoto albumId={albumId} />
			<DeletePhoto />
			<div className={styles.imageContainer}>
				{pagePhotos &&
					pagePhotos.map((photo) => (
						<img
							key={photo.id}
							src={photo.thumbnailUrl}
							className={styles.albumImage}
						/>
					))}
			</div>
			<div className={styles.buttonContainer}>
				{pageId > 1 && (
					<Link
						to={`../${parseInt(pageId) - 1}`}
						relative="path"
						className={styles.pageButton}
					>
						Last Page
					</Link>
				)}
				{showNextPageButon && (
					<Link
						to={`../${parseInt(pageId) + 1}`}
						relative="path"
						className={styles.pageButton}
					>
						Next Page
					</Link>
				)}
			</div>
		</>
	);
}
