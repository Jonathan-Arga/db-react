import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createContext, useRef, useState } from "react";
import { MAIN_URL } from "../../App";

import styles from "../PostsLayout/PostsLayout.module.css";

export const DeletingAlbumsContext = createContext(null);

export function DeleteAlbum(userId, albumId, navigate) {
	return fetch(MAIN_URL + `albums/${albumId}`, {
		method: "DELETE",
	}).then(() => navigate());
}
export async function HighestID(objects = [{}], idfield) {
	return Math.max(...objects.map((o) => Number.parseInt(o[idfield])));
}

export default function AlbumsLayout() {
	const newAlbumDialog = useRef();
	const newAlbumTitle = useRef();
	const newAlbumURL = useRef();
	const newAlbumThumbnail = useRef();

	const navigate = useNavigate();
	const location = useLocation();
	const [DeletingAlbumsContextState, SetDeletingAlbumsContextState] =
		useState(false);
	const currentPage = location.pathname.substring(
		location.pathname.lastIndexOf("/") + 1
	);

	const handleNewAlbumSubmit = async (e) => {
		e.preventDefault();
		if (
			!newAlbumTitle ||
			newAlbumTitle.current.value === "" ||
			!newAlbumURL ||
			newAlbumURL.current.value === "" ||
			!newAlbumThumbnail ||
			newAlbumThumbnail.current.value === ""
		)
			return alert("Please fill in all fields.");
		fetch(MAIN_URL + "albums")
			.then((response) => response.json())
			.then(async (albums) => {
				fetch(MAIN_URL + "albums", {
					method: "POST",
					body: JSON.stringify({
						userId: Number.parseInt(
							localStorage.getItem("current")
						),
						id: (await HighestID(albums, "id")) + 1,
						title: newAlbumTitle.current.value,
						url: newAlbumURL.current.value,
						thumbnailUrl: newAlbumThumbnail.current.value,
					}),
				}).then(() => {
					newAlbumDialog.current.close();
					newAlbumTitle.current.value = "";
					newAlbumURL.current.value = "";
					newAlbumThumbnail.current.value = "";
					window.location.reload();
				});
			});
	};

	/**
	 * @param {MouseEvent} e
	 */
	const HandleNewAlbumClick = () => {
		if (currentPage != "albums") navigate("/albums");
		newAlbumDialog.current.open = true;
	};
	/**
	 * @param {MouseEvent} e
	 */
	const HandleDeleteAlbumClick = () => {
		if (currentPage != "albums") {
			let userid = location.pathname.substring(
				location.pathname.lastIndexOf("/") + 1
			);
			userid = userid.substring(0, userid.indexOf("/"));
			DeleteAlbum(
				Number.parseInt(userid),
				Number.parseInt(currentPage),
				() => navigate("/albums")
			);
		} else
			SetDeletingAlbumsContextState(
				(prevIsDeletingAlbums) => !prevIsDeletingAlbums
			);
	};
	return (
		<>
			<DeletingAlbumsContext.Provider
				value={[
					DeletingAlbumsContextState,
					SetDeletingAlbumsContextState,
				]}
			>
				<div className={styles.albumsLayoutHeader}>
					<div className={styles.title}>Albums</div>
					<AlbumsButtons />
				</div>
				<AlbumsDialog />
				<Outlet />
			</DeletingAlbumsContext.Provider>
		</>
	);

	function AlbumsButtons() {
		return (
			<div className={styles.buttons}>
				{currentPage === "albums" ? (
					<button
						className={styles.NewAlbumButton}
						onClick={HandleNewAlbumClick}
					>
						&#x2B;
					</button>
				) : (
					false
				)}
				<button
					className={
						DeletingAlbumsContextState
							? [styles.DeleteAlbumButtonFocused]
							: [styles.DeleteAlbumButton]
					}
					onClick={HandleDeleteAlbumClick}
				>
					&#128465;
				</button>
			</div>
		);
	}
	function AlbumsDialog() {
		return (
			<dialog className={styles.newAlbumDialog} ref={newAlbumDialog}>
				<fieldset className={styles.newAlbumFieldset}>
					<legend>New Album</legend>
					<input
						ref={newAlbumTitle}
						type="text"
						placeholder="Title"
						required
					/>
					<input
						ref={newAlbumURL}
						type="text"
						placeholder="URL"
						required
					/>
					<input
						ref={newAlbumThumbnail}
						type="text"
						placeholder="Title"
						required
					/>
					<button
						className={styles.confirmationButton}
						onClick={handleNewAlbumSubmit}
					>
						Create
					</button>
					<button
						type="button"
						className={styles.cancelationButton}
						onClick={() => newAlbumDialog.current.close()}
					>
						Cancel
					</button>
				</fieldset>
			</dialog>
		);
	}
}
