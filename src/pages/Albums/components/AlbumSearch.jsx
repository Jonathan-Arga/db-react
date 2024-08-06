import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
		<form onSubmit={search}>
			<input
				type="text"
				value={searchValue}
				onChange={(e) => setSearchVaue(e.target.value)}
				placeholder="Search"
			/>
			<select
				value={searchBy}
				onChange={(e) => setSearchBy(e.target.value)}
			>
				<option value="title">title</option>
				<option value="id">id</option>
			</select>
			<button>Search</button>
			<button type="button" onClick={() => navigate(".")}>
				Clear
			</button>
		</form>
	);
}
