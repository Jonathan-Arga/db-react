import { useEffect, useRef, useState } from "react";
import { checkLoggedIn, getData } from "../../util";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./css/Todos.module.css";
import TodoSort from "./components/TodoSort";
import TodoSearch from "./components/TodoSearch";
import TodoItem from "./components/TodoItem";
import AddItem from "./components/AddItem";

export default function Todos() {
	let userRef = useRef(null);
	const [todos, setTodos] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const sortBy = searchParams.get("sort") || "id";
	const searchBy = searchParams.get("searchBy") || "blank";
	const query = searchParams.get("query") || "";

	const userTodos =
		todos && todos.filter((todo) => todo.userId == userRef.current);

	const filteredTodos =
		userTodos && userTodos.filter(filterFuntions[searchBy](query));

	const sortedTodos =
		filteredTodos && filteredTodos.sort(sortFunctions[sortBy]);

	useEffect(() => {
		userRef.current = checkLoggedIn();
		if (!userRef.current) {
			navigate("/login");
		}
		getData("todos", setTodos);
	}, []);

	return (
		<>
			<div className={styles.TodosHeader}>
				<TodoSort />
				<TodoSearch />
			</div>
			<AddItem />
			<ul className={styles.todoList}>
				{sortedTodos ? (
					sortedTodos.map((item) => (
						<TodoItem key={item.id} item={item} />
					))
				) : (
					<h1>Loading...</h1>
				)}
			</ul>
		</>
	);
}

const sortFunctions = {
	id: (a, b) => a.id - b.id,
	title: (a, b) => (a.title < b.title ? -1 : 1),
	checked: (a, b) => {
		if (a.completed === b.completed) return a.id - b.id;
		return a.completed ? 1 : -1;
	},
	random: () => Math.round(Math.random()) * 2 - 1,
};

const filterFuntions = {
	blank: () => (item) => true,
	title: (query) => (item) => item.title.includes(query),
	id: (id) => (item) => id ? item.id === id : true,
	checked: () => (item) => {
		console.log(item);
		return item.completed;
	},
	unchecked: () => (item) => !item.completed,
};
