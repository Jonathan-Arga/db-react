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
		fetch(
			MAIN_URL +
				`users/${Number.parseInt(localStorage.getItem('current'))}`
		)
			.then((res) => res.json())
			.then((commentingUser) => {
				fetch(MAIN_URL + 'comments')
					.then((res) => res.json())
					.then(async (data) =>
						fetch(MAIN_URL + 'comments', {
							method: 'POST',
							body: JSON.stringify({
								postId: Number.parseInt(postid),
								id: (
									(await HighestID(data, 'id')) + 1
								).toString(),
								name: commentTitleRef.current.value,
								email: commentingUser['email'],
								body: commentBodyRef.current.value,
							}),
						}).then(() => fetchComments())
					);
			});
	};

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
					<div
						onKeyDown={(ev) =>
							ev.key === 'Enter'
								? newComment()
								: console.log(ev.key)
						}
						className={styles.postPageBody}
					>
						{post['body']}
					</div>
					<div
						onKeyDown={(ev) =>
							ev.key === 'Enter' ? newComment() : false
						}
						className={styles.postPageNewComment}
					>
						<input ref={commentTitleRef} placeholder="Title" />
						<textarea
							ref={commentBodyRef}
							placeholder="Comment..."
						/>
						<button onClick={newComment}>Send</button>
					</div>
					<div className={styles.postPageComments}>
						{comments ? (
							comments.toReversed().map((comment) => (
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
							))
						) : (
							<div>Loading Comments...</div>
						)}
					</div>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</>
	);
}
