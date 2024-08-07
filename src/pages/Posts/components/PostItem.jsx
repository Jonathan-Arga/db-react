import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./PostItem.module.css";
import { useContext } from "react";
import {
	Delete,
	DeletingContext,
} from "../../../Layout/SectionLayout/SectionLayout";
export default function PostItem({ post }) {
	const navigate = useNavigate();
	const [deletingPosts] = useContext(DeletingContext);
	const postHref = `${post["id"]}`;

	return (
		<fieldset
			className={styles.PostItem}
			onClick={() =>
				deletingPosts
					? Delete(
							post["id"],
							() => window.location.reload(),
							"posts",
							post["userId"]
					  )
					: navigate(postHref)
			}
		>
			<legend className={styles.PostItemHeader}>{post["title"]}</legend>
			<div className={styles.PostItemText}>{post["body"]}</div>
		</fieldset>
	);
}
PostItem.propTypes = {
	post: PropTypes.object,
};
