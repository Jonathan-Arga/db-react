import { useEffect, useState } from 'react';
import { MAIN_URL } from '../../App';
import PostItem from './components/PostItem';
import styles from './Posts.module.css';

export default function Posts() {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		fetch(MAIN_URL + 'posts')
			.then((response) => response.json())
			.then((data) => setPosts(data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<ul className={styles.Posts}>
			{posts.map((item) => (
				<PostItem key={JSON.stringify(item)} post={item} />
			))}
		</ul>
	);
}
