import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AlbumSearch() {
	const [searchBy, setSearchBy] = useState("id");
	const [searchValue, setSearchVaue] = useState("");
	const navigate = useNavigate();

	function search(e) {
		e.preventDefault();
		navigate(`?${searchBy}=${searchValue}`);
	}

	return (
		<form onSubmit={search}>
			<input
				type="text"
				value={searchValue}
				onChange={(e) => setSearchVaue(e.target.value)}
			/>
			<select
				value={searchBy}
				onChange={(e) => setSearchBy(e.target.value)}
			>
				<option value="id">id</option>
				<option value="title">title</option>
			</select>
			<button>Search</button>
			<button type="button" onClick={() => navigate(".")}>
				Clear
			</button>
		</form>
	);
}
