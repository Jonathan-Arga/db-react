import { useState } from "react";

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
			<div>
				<p>Which photo do you want to delete?</p>
				<form onSubmit={addPhoto}>
					<input
						type="text"
						value={id}
						onChange={(e) => setId(e.target.value)}
						placeholder="ID"
					/>

					<button>delete</button>
					<button
						type="button"
						onClick={() => setDelteingPhoto(false)}
					>
						Cancel
					</button>
				</form>
			</div>
		);
	return <button onClick={() => setDelteingPhoto(true)}>Delete Photo</button>;
}
