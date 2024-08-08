import { useState } from "react";
import styles from "../css/Albums.module.css";
import { MAIN_URL } from "../../../App";

export default function DeletePhoto({ setDeleteMode, deleteMode }) {
	const [id, setId] = useState("");

	// if (deletingPhoto)
	// 	return (
	// 		<div className={styles.dialog}>
	// 			<p>Which photo do you want to delete?</p>
	// 			<form onSubmit={addPhoto}>
	// 				<input
	// 					type="text"
	// 					value={id}
	// 					onChange={(e) => setId(e.target.value)}
	// 					placeholder="ID"
	// 					className={styles.blockInput}
	// 				/>

	// 				<button className={styles.albumButton}>delete</button>
	// 				<button
	// 					type="button"
	// 					onClick={() => setDelteingPhoto(false)}
	// 					className={styles.albumButton}
	// 				>
	// 					Cancel
	// 				</button>
	// 			</form>
	// 		</div>
	// 	);
	return (
		<button
			onClick={() => setDeleteMode((d) => !d)}
			className={
				deleteMode ? styles.deleteButton : styles.lightAlbumButton
			}
		>
			Delete Photo
		</button>
	);
}
