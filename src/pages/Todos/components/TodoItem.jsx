import { useContext, useState } from "react";
import styles from "../css/Todos.module.css";
import { MAIN_URL } from "../../../App";
// import {
// 	DeleteTodo,
// 	DeletingTodosContext,
// } from "../../../Layout/TodoLayout/TodoLayout";
import {
	Delete,
	DeletingContext,
} from "../../../Layout/SectionLayout/SectionLayout";
import { useNavigate } from "react-router-dom";

export default function TodoItem({ item }) {
	const [checked, setChecked] = useState(item.completed);
	const [deletingItems] = useContext(DeletingContext);
	const navigate = useNavigate();

	function handleChange() {
		if (deletingItems) {
			Delete(item.id, navigate, "todos");
			window.location.reload();
			return;
		}
		setChecked((c) => !c);
		item.completed = !item.completed;
		fetch(`${MAIN_URL}todos/${item.id}`, {
			method: "PUT",
			body: JSON.stringify(item),
		});
	}

	return (
		<li className={styles.todoItem} onClick={handleChange}>
			<input type="checkbox" checked={checked} onChange={handleChange} />
			<p>ID: {item.id}</p>
			<h2>{item.title}</h2>
		</li>
	);
}
