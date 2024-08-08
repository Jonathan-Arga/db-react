import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createContext, useRef, useState } from "react";
import { MAIN_URL } from "../../App";

import styles from "./SectionLayout.module.css";

export const DeletingContext = createContext(null);

export function Delete(id, navigate, path, userId = null) {
	if (userId && Number.parseInt(localStorage.getItem("current")) !== userId)
		return alert("You are not authorized to delete this post.");
	return fetch(MAIN_URL + `${path}/${id}`, {
		method: "DELETE",
	}).then(() => navigate(path));
}
export async function HighestID(pathOrData, idfield) {
	if (pathOrData instanceof Array) {
		return Math.max(
			...pathOrData.map((obj) => Number.parseInt(obj[idfield]))
		);
	}
	if (pathOrData instanceof String) {
		const res = await fetch(`${MAIN_URL}${path}`);
		const data = await res.json();
		return Math.max(...data.map((obj) => Number.parseInt(obj[idfield])));
	}
	console.log("something went wrong in HighestID");
}

export default function SectionLayout({ sectionName, fields }) {
	const newDialog = useRef();
	const newTitle = useRef();
	const newTextField = useRef();

	const navigate = useNavigate();
	const location = useLocation();
	const [DeletingContextState, SetDeletingContextState] = useState(false);
	const currentPage = location.pathname.substring(
		location.pathname.lastIndexOf("/") + 1
	);

	const makeNewData = async () => {
		const id = ((await HighestID(sectionName, "id")) + 1).toString();
		const userId = Number.parseInt(localStorage.getItem("current"));
		const title = newTitle.current.value;
		switch (sectionName) {
			case "todos":
				return {
					userId,
					id,
					title,
					completed: false,
				};
			case "posts":
				return {
					userId,
					id,
					title,
					body: newTextField.current.value,
				};
			case "albums":
				return {
					userId,
					id,
					title,
				};
			default:
				break;
		}
	};

	const handleNewSubmit = async (e) => {
		e.preventDefault();
		if (
			!newTitle ||
			newTitle.current.value === "" ||
			(sectionName === "posts" &&
				(!newTextField || newTextField.current.value === ""))
		)
			return alert("Please fill in all fields.");
		fetch(MAIN_URL + sectionName)
			.then((response) => response.json())
			.then(async (posts) => {
				const newData = await makeNewData();
				fetch(MAIN_URL + sectionName, {
					method: "POST",
					body: JSON.stringify(newData),
				}).then(() => {
					newDialog.current.close();
					newTitle.current.value = "";
					if (newTextField.value) newTextField.current.value = "";
					window.location.reload();
				});
			});
	};

	/**
	 * @param {MouseEvent} e
	 */
	const HandleNewClick = () => {
		if (currentPage != sectionName) navigate(`/${sectionName}`);
		newDialog.current.open = true;
	};
	/**
	 * @param {MouseEvent} e
	 */
	const HandleDeleteClick = () => {
		if (sectionName !== "todos" && currentPage != sectionName) {
			let userid = location.pathname.substring(
				location.pathname.lastIndexOf("/") + 1
			);
			userid = userid.substring(0, userid.indexOf("/"));
			Delete(Number.parseInt(userid), Number.parseInt(currentPage), () =>
				navigate(`/${sectionName}`)
			);
		} else SetDeletingContextState((prevIsDeleting) => !prevIsDeleting);
	};
	return (
		<>
			<DeletingContext.Provider
				value={[DeletingContextState, SetDeletingContextState]}
			>
				<div className={styles.layoutHeader}>
					{currentPage !== sectionName && (
						<button
							className={styles.backButton}
							onClick={() => navigate(`/${sectionName}`)}
						>
							&larr;
						</button>
					)}
					<div className={styles.title}>{sectionName}</div>

					<Buttons />
				</div>
				<Dialog />
				<Outlet />
			</DeletingContext.Provider>
		</>
	);

	function Buttons() {
		return (
			<div className={styles.buttons}>
				{currentPage === sectionName ? (
					<>
						<button
							className={styles.NewButton}
							onClick={HandleNewClick}
						>
							&#x2B;
						</button>
						<button
							className={
								DeletingContextState
									? [styles.DeleteButtonFocused]
									: [styles.DeleteButton]
							}
							onClick={HandleDeleteClick}
						>
							&#128465;
						</button>
					</>
				) : (
					false
				)}
			</div>
		);
	}
	function Dialog() {
		return (
			<dialog className={styles.newDialog} ref={newDialog}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleNewSubmit();
					}}
				>
					<fieldset className={styles.newFieldset}>
						<legend>New </legend>
						<input
							ref={newTitle}
							type="text"
							placeholder="Title"
							required
						/>
						{sectionName === "posts" && (
							<textarea
								ref={newTextField}
								placeholder="Content"
								required
							/>
						)}
						<button
							className={styles.confirmationButton}
							onClick={handleNewSubmit}
						>
							Create
						</button>
						<button
							type="button"
							className={styles.cancelationButton}
							onClick={() => newDialog.current.close()}
						>
							Cancel
						</button>
					</fieldset>
				</form>
			</dialog>
		);
	}
}
