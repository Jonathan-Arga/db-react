import { useNavigate, useParams } from 'react-router-dom';
import { MAIN_URL } from '../../../App';
import { useEffect, useRef, useState } from 'react';
import { HighestID } from '../../../Layout/PostsLayout/PostsLayout';

import styles from './PostPage.module.css';

export default function PostPage() {
	const { postid } = useParams();
	const navigate = useNavigate();

	const [post, setPost] = useState(undefined);
	const [comments, setComments] = useState(undefined);
	const [user, setUser] = useState(undefined);

	const commentTitleRef = useRef();
	const commentBodyRef = useRef();
	useEffect(() => {
		fetch(MAIN_URL + `posts/${postid}`)
			.then((response) => response.json())
			.then((data) => {
				setPost(data);
				fetch(MAIN_URL + `users/${data.userId}`)
					.then((response) => response.json())
					.then((data) => setUser(data))
					.catch((err) =>
						err ? console.log(err) && navigate('/posts') : false
					);
			});
		fetch(MAIN_URL + `comments?postId=${postid}`)
			.then((response) => response.json())
			.then((data) => setComments(data))
			.catch((err) => (err ? console.log(err) : false));
	}, []);

	const fetchComments = () => {
		console.log(MAIN_URL + `comments?postId=${postid}`);
		fetch(MAIN_URL + `comments?postId=${postid}`)
			.then((response) => response.json())
			.then((data) => setComments(data))
			.catch((err) => {
				if (err) {
					console.log(err);
					navigate('/posts');
				}
			});
		console.log('fetching comments');
	};
	const newComment = () => {
		if (
			!commentTitleRef ||
			commentTitleRef.current.value === '' ||
			!commentBodyRef ||
			commentBodyRef.current.value === ''
		)
			return alert('Please fill out all fields.');
		setComments(undefined);
		fetch(MAIN_URL + 'comments')
			.then((res) => res.json())
			.then(async (data) =>
				fetch(MAIN_URL + 'comments', {
					method: 'POST',
					body: JSON.stringify({
						postId: Number.parseInt(postid),
						id: ((await HighestID(data, 'id')) + 1).toString(),
						name: commentTitleRef.current.value,
						email: user['email'],
						body: commentBodyRef.current.value,
					}),
				}).then(() => fetchComments())
			);
		console.log(
			JSON.stringify({
				'postId': Number.parseInt(postid),
				'id': (500 + 1).toString(),
				'name': commentTitleRef.current.value,
				'email': user['email'],
				'body': commentBodyRef.current.value,
			})
		);
	};
	// {
	// 		"postId": 1,
	// 		"id": "1",
	// 		"name": "id labore ex et quam laborum",
	// 		"email": "Eliseo@gardner.biz",
	// 		"body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
	// 	}

	return (
		<>
			{user && post ? (
				<div className={styles.postPage}>
					<div className={styles.postPageHeader}>
						<div className={styles.postPageTitle}>
							{post['title']}
						</div>
						<div className={styles.postPageUser}>
							-{user['username']}
						</div>
					</div>
					<div className={styles.postPageBody}>{post['body']}</div>
					<div className={styles.postPageNewComment}>
						<input ref={commentTitleRef} placeholder="Title" />
						<br />
						<textarea
							ref={commentBodyRef}
							placeholder="Comment..."
						/>
						<button onClick={newComment}>Send</button>
					</div>
					{comments ? (
						<div className="postPageComments">
							{comments.toReversed().map((comment) => (
								<fieldset
									key={JSON.stringify(comment)}
									className="postComment"
								>
									<legend>
										{comment['name']}&#10240;-&#10240;
										<span className="subtitle">
											{comment['email']}
										</span>
									</legend>
									<div className="commentBody">
										{comment['body']}
									</div>
								</fieldset>
							))}
						</div>
					) : (
						<div>Loading Comments...</div>
					)}
				</div>
			) : (
				<div>Loading...</div>
			)}
		</>
	);
}
