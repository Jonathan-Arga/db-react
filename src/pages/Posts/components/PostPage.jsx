import { useNavigate, useParams } from 'react-router-dom';
import { MAIN_URL } from '../../../App';
import { useEffect, useState } from 'react';

export default function PostPage() {
	const { postid } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState(undefined);
	const [user, setUser] = useState(undefined);
	useEffect(() => {
		fetch(MAIN_URL + `posts/${postid}`)
			.then((response) => response.json())
			.then((data) => {
				setPost(data);
				fetch(MAIN_URL + `users/${data.userId}`)
					.then((response) => response.json())
					.then((data) => setUser(data))
					.catch((err) => (err ? navigate('/posts') : false));
			});
	}, []);

	return (
		<>
			{user && post ? (
				<div>
					<div>
						{post['title']}
						<div>{user['username']}</div>
					</div>
					<div>{post['body']}</div>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</>
	);
}
