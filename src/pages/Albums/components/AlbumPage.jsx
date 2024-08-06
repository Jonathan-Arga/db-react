import { useEffect, useRef, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { checkLoggedIn, getData } from "../../../util";
import AddPhoto from "./AddPhoto";
import DeletePhoto from "./DeletePhoto";

export default function AlbumPage() {
	const { albumid } = useParams();
	const [photos, setPhotos] = useState(null);
	const userRef = useRef(null);
	const { photoIdRef } = useOutletContext();

	useEffect(() => {
		userRef.current = checkLoggedIn();
		if (!userRef.current) {
			return null;
		}
		getData(`photos`, setPhotos);
	}, []);

	const albumPhotos = photos
		? photos.filter((photo) => photo.albumId == albumid)
		: null;

	return (
		<>
			<AddPhoto albumId={albumid} />
			<DeletePhoto />
			{albumPhotos &&
				albumPhotos.map((photo) => (
					<Link to={photo.id} key={photo.id}>
						<img src={photo.thumbnailUrl} />
					</Link>
				))}
		</>
	);
}
