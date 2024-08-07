import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function TodoSort() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [sortBy, setSortBy] = useState(searchParams.get("sort") || "id");

	function changeSort(e) {
		setSortBy(e.target.value);
		setSearchParams((params) => ({
			...Object.fromEntries(params.entries()),
			sort: e.target.value,
		}));
	}

	return (
		<fieldset>
			<legend>Sort</legend>
			<select value={sortBy} onChange={changeSort}>
				<option value="id">ID</option>
				<option value="title">Title</option>
				<option value="checked">Checked</option>
				<option value="random">Random</option>
			</select>
		</fieldset>
	);
}
