import { Outlet, redirect, useLocation } from 'react-router-dom';
import { DeletingPostsContext, MAIN_URL } from '../../App';
import { useContext } from 'react';

export default function PostsLayout() {
	const location = useLocation();
	const [isDeletingPosts, setIsDeletingPosts] =
		useContext(DeletingPostsContext);
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
		setIsDeletingPosts((prevIsDeletingPosts) => !prevIsDeletingPosts);
	};
	return (
		<>
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
		</>
	);
}
