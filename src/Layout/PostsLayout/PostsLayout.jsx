import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { createContext, useRef, useState } from 'react';
import { MAIN_URL } from '../../App';

import styles from './PostsLayout.module.css';

export const DeletingPostsContext = createContext(null);
export const SearchingPostsContext = createContext(null);

export function DeletePost(userId, postId, navigate) {
	if (Number.parseInt(localStorage.getItem('current')) !== userId)
		return alert('You are not authorized to delete this post.');
	// delete postId cause its a post
	console.log(`posts/${postId}`);
	return fetch(MAIN_URL + `posts/${postId}`, {
		method: 'DELETE',
	}).then(() => navigate());
}
export async function HighestID(objects = [{}], idfield) {
	return Math.max(...objects.map((o) => Number.parseInt(o[idfield])));
}

export default function PostsLayout() {
	const newPostDialog = useRef();
	const newPostTitle = useRef();
	const newPostTextField = useRef();

	const searchFieldRef = useRef();
	const [searchingPostsState, setSearchingPostsState] = useState('');

	const navigate = useNavigate();
	const location = useLocation();
	const [DeletingPostsContextState, SetDeletingPostsContextState] =
		useState(false);
	const currentPage = location.pathname.substring(
		location.pathname.lastIndexOf('/') + 1
	);

	const handleNewPostSubmit = async (e) => {
		e.preventDefault();
		if (
			!newPostTitle ||
			newPostTitle.current.value === '' ||
			!newPostTextField ||
			newPostTextField.current.value === ''
		)
			return alert('Please fill in all fields.');
		fetch(MAIN_URL + 'posts')
			.then((response) => response.json())
			.then(async (posts) => {
				fetch(MAIN_URL + 'posts', {
					method: 'POST',
					body: JSON.stringify({
						userId: Number.parseInt(
							localStorage.getItem('current')
						),
						id: (await HighestID(posts, 'id')) + 1,
						title: newPostTitle.current.value,
						body: newPostTextField.current.value,
					}),
				}).then(() => {
					newPostDialog.current.close();
					newPostTitle.current.value = '';
					newPostTextField.current.value = '';
					window.location.reload();
				});
			});
	};

	const HandleSearchChange = () => {
		console.log(searchingPostsState);
		setSearchingPostsState(() => searchFieldRef.current.value);
		console.log(searchingPostsState);
	};

	return (
		<>
			<SearchingPostsContext.Provider
				value={[searchingPostsState, setSearchingPostsState]}
			>
				<DeletingPostsContext.Provider
					value={[
						DeletingPostsContextState,
						SetDeletingPostsContextState,
					]}
				>
					<div className={styles.postsLayoutHeader}>
						<div className={styles.title}>Posts</div>
						<input
							ref={searchFieldRef}
							placeholder="Search for post..."
							type="search"
							onChange={HandleSearchChange}
						/>
						<PostsButtons />
					</div>
					<PostsDialog />
					<Outlet />
				</DeletingPostsContext.Provider>
			</SearchingPostsContext.Provider>
		</>
	);

	function PostsButtons() {
		/**
		 * @param {MouseEvent} e
		 */
		const HandleNewPostClick = () => {
			if (currentPage != 'posts') navigate('/posts');
			newPostDialog.current.open = true;
		};
		/**
		 * @param {MouseEvent} e
		 */
		const HandleDeletePostClick = () => {
			if (currentPage != 'posts') {
				let userid = location.pathname.substring(
					location.pathname.lastIndexOf('/') + 1
				);
				userid = userid.substring(0, userid.indexOf('/'));
				DeletePost(
					Number.parseInt(userid),
					Number.parseInt(currentPage),
					() => navigate('/posts')
				);
			} else
				SetDeletingPostsContextState(
					(prevIsDeletingPosts) => !prevIsDeletingPosts
				);
		};
		return (
			<div className={styles.buttons}>
				{currentPage === 'posts' ? (
					<>
						<button
							className={styles.NewPostButton}
							onClick={HandleNewPostClick}
						>
							&#x2B;
						</button>
						<button
							className={
								DeletingPostsContextState
									? [styles.DeletePostButtonFocused]
									: [styles.DeletePostButton]
							}
							onClick={HandleDeletePostClick}
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
	function PostsDialog() {
		return (
			<dialog className={styles.newPostDialog} ref={newPostDialog}>
				<fieldset className={styles.newPostFieldset}>
					<legend>New Post</legend>
					<input
						ref={newPostTitle}
						type="text"
						placeholder="Title"
						required
					/>
					<textarea
						ref={newPostTextField}
						placeholder="Content"
						required
					/>
					<button
						className={styles.confirmationButton}
						onClick={handleNewPostSubmit}
					>
						Create
					</button>
					<button
						type="button"
						className={styles.cancelationButton}
						onClick={() => newPostDialog.current.close()}
					>
						Cancel
					</button>
				</fieldset>
			</dialog>
		);
	}
}
