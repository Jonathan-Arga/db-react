import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createContext, useRef, useState } from "react";
import { MAIN_URL } from "../../App";

import styles from "../PostsLayout/PostsLayout.module.css";

export const DeletingTodosContext = createContext(null);

export function DeleteTodo(itemId, navigate) {
	return fetch(MAIN_URL + `todos/${itemId}`, {
		method: "DELETE",
	}).then(() => navigate("."));
}
export async function HighestID(objects = [{}], idfield) {
	return Math.max(...objects.map((o) => Number.parseInt(o[idfield])));
}

export default function TodosLayout() {
	const newTodoDialog = useRef();
	const newTodoTitle = useRef();

	const [DeletingTodosContextState, SetDeletingTodosContextState] =
		useState(false);

	const handleNewTodoSubmit = async (e) => {
		e.preventDefault();
		if (!newTodoTitle || newTodoTitle.current.value === "")
			return alert("Please fill in title.");
		fetch(MAIN_URL + "todos")
			.then((response) => response.json())
			.then(async (items) => {
				fetch(MAIN_URL + "todos", {
					method: "POST",
					body: JSON.stringify({
						userId: Number.parseInt(
							localStorage.getItem("current")
						),
						id: ((await HighestID(items, "id")) + 1).toString(),
						title: newTodoTitle.current.value,
						completed: false,
					}),
				}).then(() => {
					newTodoDialog.current.close();
					newTodoTitle.current.value = "";
					window.location.reload();
				});
			});
	};

	/**
	 * @param {MouseEvent} e
	 */
	const HandleNewTodoClick = () => {
		newTodoDialog.current.open = true;
	};
	/**
	 * @param {MouseEvent} e
	 */
	const HandleDeleteTodoClick = () => {
		SetDeletingTodosContextState(
			(prevIsDeletingTodos) => !prevIsDeletingTodos
		);
	};
	return (
		<>
			<DeletingTodosContext.Provider
				value={[
					DeletingTodosContextState,
					SetDeletingTodosContextState,
				]}
			>
				<div className={styles.postsLayoutHeader}>
					<div className={styles.title}>Todos</div>
					<TodosButtons />
				</div>
				<TodosDialog />
				<Outlet />
			</DeletingTodosContext.Provider>
		</>
	);

	function TodosButtons() {
		return (
			<div className={styles.buttons}>
				<button
					className={styles.NewPostButton}
					onClick={HandleNewTodoClick}
				>
					&#x2B;
				</button>

				<button
					className={
						DeletingTodosContextState
							? [styles.DeletePostButtonFocused]
							: [styles.DeletePostButton]
					}
					onClick={HandleDeleteTodoClick}
				>
					&#128465;
				</button>
			</div>
		);
	}
	function TodosDialog() {
		return (
			<dialog className={styles.newPostDialog} ref={newTodoDialog}>
				<fieldset className={styles.newPostFieldset}>
					<legend>New Todo</legend>
					<input
						ref={newTodoTitle}
						type="text"
						placeholder="Title"
						required
					/>
					<button
						className={styles.confirmationButton}
						onClick={handleNewTodoSubmit}
					>
						Create
					</button>
					<button
						type="button"
						className={styles.cancelationButton}
						onClick={() => newTodoDialog.current.close()}
					>
						Cancel
					</button>
				</fieldset>
			</dialog>
		);
	}
}
