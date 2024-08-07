import { useContext, useEffect, useState } from "react";
import { MAIN_URL } from "../../App";
import PostItem from "./components/PostItem";
import styles from "./Posts.module.css";
import { DeletingContext } from "../../Layout/SectionLayout/SectionLayout";

export default function Posts() {
	const [posts, setPosts] = useState([]);
	const [isDeletingPosts] = useContext(DeletingContext);
	const [currentSearch, setCurrentSearch] = useState("");
	useEffect(() => {
		fetch(MAIN_URL + "posts")
			.then((response) => response.json())
			.then((data) => setPosts(data))
			.catch((err) => console.error(err));
	}, []);
	const isSearching = (item) =>
		!currentSearch ||
		(currentSearch !== "" &&
			(item["body"].includes(currentSearch) ||
				item["title"].includes(currentSearch)));
	return (
		<>
			<input
				type="search"
				placeholder="Search posts"
				onChange={(e) => setCurrentSearch(e.target.value)}
			/>
			<ul className={styles.Posts}>
				{posts.map((item) =>
					isDeletingPosts ? (
						item.userId ===
						Number.parseInt(localStorage.getItem("current")) ? (
							<PostItem key={JSON.stringify(item)} post={item} />
						) : null
					) : isSearching(item) ? (
						<PostItem key={JSON.stringify(item)} post={item} />
					) : null
				)}
			</ul>
		</>
	);
}
