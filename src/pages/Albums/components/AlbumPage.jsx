import { useEffect, useRef, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { checkLoggedIn, getData } from "../../../util";
import AddPhoto from "./AddPhoto";
import DeletePhoto from "./DeletePhoto";

const PHOTOS_PER_PAGE = 10;

export default function AlbumPage() {
	const { albumid, pageid } = useParams();
	const [albumId, pageId] = [parseInt(albumid), parseInt(pageid)];
	const [photos, setPhotos] = useState(null);
	const userRef = useRef(null);
	const [album, setAlbum] = useState(null);

	useEffect(() => {
		userRef.current = checkLoggedIn();
		if (!userRef.current) {
			return null;
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
			{pagePhotos &&
				pagePhotos.map((photo) => (
					<img key={photo.id} src={photo.thumbnailUrl} />
				))}
			{pageId > 1 && (
				<Link to={`../${parseInt(pageId) - 1}`} relative="path">
					Last Page
				</Link>
			)}
			{showNextPageButon && (
				<Link to={`../${parseInt(pageId) + 1}`} relative="path">
					Next Page
				</Link>
			)}
		</>
	);
}
