import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './TodoSearch.module.css';

export default function TodoSearch() {
	const [searchBy, setSearchBy] = useState('title');
	const [searchValue, setSearchValue] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();

	function search(e) {
		e.preventDefault();
		console.log(e);
		setSearchParams((params) => ({
			...Object.fromEntries(params.entries()),
			searchBy: searchBy,
			query: searchValue,
		}));
		setSearchValue('');
	}

	function updateSearchBy(e) {
		const category = e.target.value;
		console.log('category:', category);
		setSearchBy(category);
		setSearchValue('');
		setSearchParams((params) => ({
			...Object.fromEntries(params.entries()),
			searchBy: category,
			query: '',
		}));
	}

	function clearSearch() {
		setSearchParams((params) => {
			const nonSearchEntries = params
				.entries()
				.filter(
					([value, _]) => value !== 'query' && value !== 'searchBy'
				);

			return Object.fromEntries(nonSearchEntries);
		});
		setSearchValue('');
	}

	let displayedSearch;

	switch (searchBy) {
		case 'title':
			displayedSearch = (
				<input
					type="text"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					placeholder="Search title"
					className={styles.titleSearchbox}
				/>
			);
			break;

		case 'id':
			displayedSearch = (
				<input
					type="number"
					value={searchValue}
					onChange={(e) => setSearchVaue(e.target.value)}
					placeholder="ID"
					className={styles.idSearchbox}
				/>
			);
			break;

		default:
			displayedSearch = null;
	}

	return (
		<form onSubmit={search}>
			<fieldset className={styles.TodoSearch}>
				<legend>search</legend>
				{displayedSearch}
				<select
					value={searchBy}
					onChange={updateSearchBy}
					className={styles.selectBox}
				>
					<option value="title">Title</option>
					<option value="id">ID</option>
					<option value="checked">Checked</option>
					<option value="unchecked">Unchecked</option>
				</select>
				<div className={styles.SearchButtons}>
					<button className={styles.SuccessButton}>Search</button>
					<button
						type="button"
						onClick={clearSearch}
						className={styles.CancelButton}
					>
						Clear
					</button>
				</div>
			</fieldset>
		</form>
	);
}
