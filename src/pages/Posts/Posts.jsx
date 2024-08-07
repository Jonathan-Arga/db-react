import { useContext, useEffect, useState } from 'react';
import { MAIN_URL } from '../../App';
import PostItem from './components/PostItem';
import styles from './Posts.module.css';
import {
	DeletingPostsContext,
	SearchingPostsContext,
} from '../../Layout/PostsLayout/PostsLayout';

export default function Posts() {
	const [posts, setPosts] = useState([]);
	const [isDeletingPosts] = useContext(DeletingPostsContext);
	const [currentSearch] = useContext(SearchingPostsContext);
	useEffect(() => {
		fetch(MAIN_URL + 'posts')
			.then((response) => response.json())
			.then((data) => setPosts(data))
			.catch((err) => console.error(err));
	}, []);
	const isSearching = (item) =>
		!currentSearch ||
		(currentSearch !== '' &&
			(item['body'].includes(currentSearch) ||
				item['title'].includes(currentSearch)));
	return (
		<ul className={styles.Posts}>
			{posts.map((item) =>
				isDeletingPosts ? (
					item.userId ===
					Number.parseInt(localStorage.getItem('current')) ? (
						isSearching(item) ? (
							<PostItem key={JSON.stringify(item)} post={item} />
						) : null
					) : null
				) : isSearching(item) ? (
					<PostItem key={JSON.stringify(item)} post={item} />
				) : null
			)}
		</ul>
	);
}
