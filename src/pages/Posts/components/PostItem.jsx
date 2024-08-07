import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './PostItem.module.css';
import { useContext } from 'react';
import {
	DeletePost,
	DeletingPostsContext,
} from '../../../Layout/PostsLayout/PostsLayout';
export default function PostItem({ post }) {
	const navigate = useNavigate();
	const [deletingPosts] = useContext(DeletingPostsContext);
	const postHref = `${post['id']}`;

	return (
		<fieldset
			className={styles.PostItem}
			onClick={() =>
				deletingPosts
					? DeletePost(post['userId'], post['id'], () =>
							window.location.reload()
					  )
					: navigate(postHref)
			}
		>
			<legend className={styles.PostItemHeader}>{post['title']}</legend>
			<div className={styles.PostItemText}>{post['body']}</div>
		</fieldset>
	);
}
PostItem.propTypes = {
	post: PropTypes.object,
};
