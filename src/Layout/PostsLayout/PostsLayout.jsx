import { Outlet, redirect, useLocation } from 'react-router-dom';
import { MAIN_URL } from '../../App';
import { createContext, useState } from 'react';

export const DeletingPostsContext = createContext(null);

export default function PostsLayout() {
	const location = useLocation();
	const [DeletingPostsContextState, SetDeletingPostsContextState] =
		useState(false);
	const currentPage = location.pathname.substring(
		location.pathname.lastIndexOf('/') + 1
	);
	/**
	 * @param {MouseEvent} e
	 */
	const HandleNewPostClick = () => {};
	/**
	 * @param {MouseEvent} e
	 */
	const HandleDeletePostClick = () => {
		if (currentPage != 'posts')
			// delete currentpage cause its a post
			return fetch(MAIN_URL + `posts/${currentPage}`, {
				method: 'DELETE',
			}).then(() => redirect('/posts'));
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
						className="DeletePostButton"
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
