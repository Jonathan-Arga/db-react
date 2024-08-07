import { useState } from "react";
import { checkLoggedIn } from "../../../util";
import styles from "../css/Albums.module.css";

export default function AddPhoto({ albumId }) {
	const [addingPhoto, setAddingPhoto] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [newURL, setNewURL] = useState("");
	const [newThumbnail, setNewThumbnail] = useState("");
	const [failText, setFailText] = useState("");

	async function addPhoto(e) {
		e.preventDefault();

		const currUserId = checkLoggedIn();
		if (!currUserId) return;
		if (newTitle.trim() === "") {
			setFailText("Empty Title");
			return;
		}
		setAddingPhoto(false);

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

		const res2 = await fetch("http://localhost:3000/photos", {
			method: "POST",
			body: JSON.stringify(newPhoto),
		});
		if (res2.ok) {
			window.location.reload();
		}
	}

	if (addingPhoto)
		return (
			<div className={styles.dialog}>
				<p>What's the title for your photo?</p>
				<form onSubmit={addPhoto}>
					<input
						type="text"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						placeholder="Title"
						className={styles.blockInput}
					/>
					<input
						type="text"
						value={newURL}
						onChange={(e) => setNewURL(e.target.value)}
						placeholder="Photo URL"
						className={styles.blockInput}
					/>
					<input
						type="text"
						value={newThumbnail}
						onChange={(e) => setNewThumbnail(e.target.value)}
						placeholder="Thumbnail URL"
						className={styles.blockInput}
					/>
					<button className={styles.albumButton}>Add</button>
					<button
						className={styles.albumButton}
						type="button"
						onClick={() => setAddingPhoto(false)}
					>
						Cancel
					</button>
				</form>
				<p>{failText}</p>
			</div>
		);
	return (
		<button
			onClick={() => setAddingPhoto(true)}
			className={styles.lightAlbumButton}
		>
			Add Photo
		</button>
	);
}
