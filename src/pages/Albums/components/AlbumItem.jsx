import { Link } from "react-router-dom";

export default function AlbumItem({ album }) {
	return (
		<li>
			<h2>Album Title: {album.title}</h2>
			<p>Album ID: {album.id}</p>
			<Link to={`${album.id}/1`}>Look at album</Link>
		</li>
	);
}
