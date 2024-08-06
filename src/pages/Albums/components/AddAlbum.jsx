import { useState } from "react";
import { checkLoggedIn } from "../../../util";

export default function AddAlbum() {
	const [addingAlbum, setAddingAlbum] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [failText, setFailText] = useState("");

	async function addAlbum(e) {
		e.preventDefault();
		setFailText("");

		const currUserId = checkLoggedIn();
		if (!currUserId) return;
		if (newTitle.trim() === "") {
			setFailText("Empty Title");
			return;
		}

		setAddingAlbum(false);

		const res = await fetch("http://localhost:3000/albums");
		const albums = await res.json();
		const maxId = albums
			.map((album) => parseInt(album.id))
			.reduce((prev, curr) => (curr > prev ? curr : prev));

		const newAlbum = {
			title: newTitle,
			userId: currUserId,
			id: maxId + 1,
		};

		setNewTitle("");

		const res2 = await fetch("http://localhost:3000/albums", {
			method: "POST",
			body: JSON.stringify(newAlbum),
		});
	}

	if (addingAlbum)
		return (
			<div>
				<p>What's the title for your album?</p>
				<form onSubmit={addAlbum}>
					<input
						type="text"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
					/>
					<button>Add</button>
					<button type="button" onClick={() => setAddingAlbum(false)}>
						Cancel
					</button>
				</form>
				<p>{failText}</p>
			</div>
		);

	return (
		<div>
			<button onClick={() => setAddingAlbum(true)}>Add Album</button>
		</div>
	);
}
