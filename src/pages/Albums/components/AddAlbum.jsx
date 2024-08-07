import { useState } from 'react';
import { checkLoggedIn } from '../../../util';
import styles from '../css/Albums.module.css';
import { useNavigate } from 'react-router-dom';

export default function AddAlbum() {
	const [addingAlbum, setAddingAlbum] = useState(false);
	const [newTitle, setNewTitle] = useState('');
	const [failText, setFailText] = useState('');

	async function addAlbum(e) {
		e.preventDefault();
		setFailText('');

		const currUserId = checkLoggedIn(useNavigate());
		if (!currUserId) return;
		if (newTitle.trim() === '') {
			setFailText('Empty Title');
			return;
		}

		setAddingAlbum(false);

		const res = await fetch('http://localhost:3000/albums');
		const albums = await res.json();
		const maxId = albums
			.map((album) => parseInt(album.id))
			.reduce((prev, curr) => (curr > prev ? curr : prev));

		const newAlbum = {
			title: newTitle,
			userId: currUserId,
			id: maxId + 1,
		};

		setNewTitle('');

		const res2 = await fetch('http://localhost:3000/albums', {
			method: 'POST',
			body: JSON.stringify(newAlbum),
		});
	}

	if (addingAlbum)
		return (
			<div className={styles.dialog}>
				<p>What's the title for your album?</p>
				<form onSubmit={addAlbum}>
					<input
						type="text"
						placeholder="Album Title"
						value={newTitle}
						className={styles.inputBox}
						onChange={(e) => setNewTitle(e.target.value)}
					/>
					<br />
					<button className={styles.albumButton}>Add</button>
					<button
						type="button"
						onClick={() => setAddingAlbum(false)}
						className={styles.albumButton}
					>
						Cancel
					</button>
				</form>
				<p>{failText}</p>
			</div>
		);

	return (
		<button
			onClick={() => setAddingAlbum(true)}
			className={styles.lightAlbumButton}
		>
			Add Album
		</button>
	);
}
