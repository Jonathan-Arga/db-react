import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './PostItem.module.css';
export default function PostItem({ post }) {
	const navigate = useNavigate();
	const postHref = `${post['id']}`;

	return (
		<fieldset
			className={styles.PostItem}
			onClick={() => navigate(postHref)}
		>
			<legend className={styles.PostItemHeader}>{post['title']}</legend>
			<div className={styles.PostItemText}>{post['body']}</div>
		</fieldset>
	);
}
PostItem.propTypes = {
	post: PropTypes.object,
};
