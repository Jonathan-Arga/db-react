import { useEffect, useRef, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getData } from "../../util";

export default function AlbumPageLayout() {
	const { albumid } = useParams();
	const [album, setAlbum] = useState(null);
	const photoIdRef = useRef(null);

	useEffect(() => {
		getData(`albums/${albumid}`, setAlbum);

		fetch("http://localhost:3000/photos")
			.then((res) => res.json())
			.then((data) => {
				photoIdRef.current = data
					.filter((photo) => photo.albumId == albumid)
					.map((photo) => parseInt(photo.id));
			});
	}, []);
	return (
		<>
			<h2>Album: {album && album.title}</h2>
			<Outlet context={{ photoIdRef }} />
		</>
	);
}
