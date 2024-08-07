import { useState } from "react";
import styles from "../css/Todos.module.css";

export default function TodoItem({ item }) {
	const [checked, setChecked] = useState(item.completed);

	function handleChange() {
		setChecked((c) => !c);
		item.completed = !item.completed;
		fetch(`http://localhost:3000/todos/${item.id}`, {
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
