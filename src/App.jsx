import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	const [d, setd] = useState(null);

	async function getUsers() {
		const res = await fetch("http://localhost:3000/users");
		const data = await res.json();
		setd(data);
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<Layout />}>
					<Route path="home" element={<Home />} />
					<Route path="todos" element={<Todos />} />
					<Route path="posts" element={<PostLayout />}>
						<Route index element={<Posts />} />
						<Route path=":postid" element={<PostItem />} />
					</Route>
					<Route path="albums" element={<AlbumLayout />}>
						<Route index element={<Albums />} />
						<Route path=":photoid" element={<AlbumItem />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
