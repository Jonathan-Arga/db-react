import { useState } from "react";
import { checkLoggedIn } from "../../../util";

export default function AddPhoto({ albumId }) {
	const [addingPhoto, setAddingPhoto] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [newURL, setNewURL] = useState("");
	const [newThumbnail, setNewThumbnail] = useState("");

	async function addPhoto(e) {
		e.preventDefault();
		setAddingPhoto(false);

		const currUserId = checkLoggedIn();
		if (!currUserId) return;

		const res = await fetch("http://localhost:3000/photos");
		const photos = await res.json();
		const maxId = photos
			.map((photo) => parseInt(photo.id))
			.reduce((prev, curr) => (curr > prev ? curr : prev));

		const newPhoto = {
			id: (maxId + 1).toString(),
			albumId: parseInt(albumId),
			title: newTitle,
			url: newURL,
			thumbnailUrl: newThumbnail,
		};

		setNewTitle("");
		setNewURL("");
		setNewThumbnail("");

		fetch("http://localhost:3000/photos", {
			method: "POST",
			body: JSON.stringify(newPhoto),
		});
	}

	if (addingPhoto)
		return (
			<div>
				<p>What's the title for your photo?</p>
				<form onSubmit={addPhoto}>
					<input
						type="text"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						placeholder="Title"
					/>
					<input
						type="text"
						value={newURL}
						onChange={(e) => setNewURL(e.target.value)}
						placeholder="Photo URL"
					/>
					<input
						type="text"
						value={newThumbnail}
						onChange={(e) => setNewThumbnail(e.target.value)}
						placeholder="Thumbnail URL"
					/>
					<button>Add</button>
					<button type="button" onClick={() => setAddingPhoto(false)}>
						Cancel
					</button>
				</form>
			</div>
		);
	return <button onClick={() => setAddingPhoto(true)}>Add Photo</button>;
}
