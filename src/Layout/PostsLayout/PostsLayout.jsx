import { Outlet, redirect, useLocation } from 'react-router-dom';
import { createContext, useRef, useState } from 'react';
import { MAIN_URL } from '../../App';

import styles from './PostsLayout.module.css';

export const DeletingPostsContext = createContext(null);

export default function PostsLayout() {
	const deletionButtonRef = useRef();

	const location = useLocation();
	const [DeletingPostsContextState, SetDeletingPostsContextState] =
		useState(false);
	const currentPage = location.pathname.substring(
		location.pathname.lastIndexOf('/') + 1
	);

	/**
	 * @param {MouseEvent} e
	 */
	const HandleNewPostClick = () => {
		if (currentPage != 'posts') redirect('/posts');
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
			if (localStorage.getItem('current') !== userid)
				return alert('You are not authorized to delete this post.');
			// delete currentpage cause its a post
			return fetch(MAIN_URL + `posts/${currentPage}`, {
				method: 'DELETE',
			}).then(() => redirect('/posts'));
		}
		SetDeletingPostsContextState(
			(prevIsDeletingPosts) => !prevIsDeletingPosts
		);
	};
	return (
		<>
			<DeletingPostsContext.Provider
				value={[
					DeletingPostsContextState,
					SetDeletingPostsContextState,
				]}
			>
				<div className="postsLayoutHeader">
					<div className="title">Posts</div>
					{currentPage === 'posts' ? (
						<button
							className="NewPostButton"
							onClick={HandleNewPostClick}
						>
							&#x2B;
						</button>
					) : (
						false
					)}
					<button
						className={
							DeletingPostsContextState
								? [styles.DeletePostButtonFocused]
								: [styles.DeletePostButton]
						}
						ref={deletionButtonRef}
						onClick={HandleDeletePostClick}
					>
						&#128465;
					</button>
				</div>
				<Outlet />
			</DeletingPostsContext.Provider>
		</>
	);
}
