import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Albums.module.css";

export default function AlbumSearch() {
	const [searchBy, setSearchBy] = useState("title");
	const [searchValue, setSearchVaue] = useState("");
	const navigate = useNavigate();

	function search(e) {
		e.preventDefault();
		navigate(`?${searchBy}=${searchValue}`);
		setSearchVaue("");
	}

	return (
		<form onSubmit={search} className={styles.search}>
			<input
				type="text"
				value={searchValue}
				onChange={(e) => setSearchVaue(e.target.value)}
				placeholder="Search"
				className={styles.inputBox}
			/>
			<select
				value={searchBy}
				onChange={(e) => setSearchBy(e.target.value)}
				className={styles.selectBox}
			>
				<option value="title">title</option>
				<option value="id">id</option>
			</select>
			<br />
			<button className={styles.albumButton}>Search</button>
			<button
				type="button"
				onClick={() => navigate(".")}
				className={styles.albumButton}
			>
				Clear
			</button>
		</form>
	);
}
