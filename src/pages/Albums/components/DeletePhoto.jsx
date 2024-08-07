import { useState } from "react";
import styles from "../css/Albums.module.css";

export default function DeletePhoto() {
	const [deletingPhoto, setDelteingPhoto] = useState(false);
	const [id, setId] = useState("");

	async function addPhoto(e) {
		e.preventDefault();
		setDelteingPhoto(false);

		const res = await fetch(`http://localhost:3000/photos/${id}`, {
			method: "DELETE",
		});

		setId("");
		window.location.reload();
	}

	if (deletingPhoto)
		return (
			<div className={styles.dialog}>
				<p>Which photo do you want to delete?</p>
				<form onSubmit={addPhoto}>
					<input
						type="text"
						value={id}
						onChange={(e) => setId(e.target.value)}
						placeholder="ID"
						className={styles.blockInput}
					/>

					<button className={styles.albumButton}>delete</button>
					<button
						type="button"
						onClick={() => setDelteingPhoto(false)}
						className={styles.albumButton}
					>
						Cancel
					</button>
				</form>
			</div>
		);
	return (
		<button
			onClick={() => setDelteingPhoto(true)}
			className={styles.lightAlbumButton}
		>
			Delete Photo
		</button>
	);
}
