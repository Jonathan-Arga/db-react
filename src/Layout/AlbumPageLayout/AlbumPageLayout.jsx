import { useEffect, useRef, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getData } from "../../util";

export default function AlbumPageLayout() {
	const { albumid } = useParams();
	const [album, setAlbum] = useState(null);

	useEffect(() => {
		getData(`albums/${albumid}`, setAlbum);
	}, []);
	return (
		<>
			<h2>Album: {album && album.title}</h2>
			<Outlet />
		</>
	);
}
