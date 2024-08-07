import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Signup/Register";
import Home from "./pages/Home/Home";
import Todos from "./pages/Todos/Todos";
import Posts from "./pages/Posts/Posts";
import PostPage from "./pages/Posts/components/PostPage";
import Albums from "./pages/Albums/Albums";
import AlbumPage from "./pages/Albums/components/AlbumPage";

import MainLayout from "./Layout/MainLayout/MainLayout";

import "./App.css";
import NavigateHome from "./Layout/MainLayout/NavigateHome";
import SectionLayout from "./Layout/SectionLayout/SectionLayout";
import Info from "./pages/Info/Info";
import NotFound from "./pages/NotFound/NotFound";

export const MAIN_URL = "http://localhost:3000/";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<MainLayout />}>
					<Route index element={<NavigateHome />} />
					<Route path="home" element={<Home />} />
					<Route
						path="todos"
						element={<SectionLayout sectionName="todos" />}
					>
						<Route index element={<Todos />} />
					</Route>
					<Route
						path="posts"
						element={<SectionLayout sectionName="posts" />}
					>
						<Route index element={<Posts />} />
						<Route path=":postid" element={<PostPage />} />
					</Route>
					<Route
						path="albums"
						element={<SectionLayout sectionName="albums" />}
					>
						<Route index element={<Albums />} />
						<Route
							path=":albumid/:pageid"
							element={<AlbumPage />}
						/>
					</Route>
					<Route path="info" element={<Info />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
