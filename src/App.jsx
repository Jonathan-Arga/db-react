import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Signup/Register';
import Home from './pages/Home/Home';
import Todos from './pages/Todos/Todos';
import Posts from './pages/Posts/Posts';
import PostItem from './pages/Posts/components/PostItem';
import PostPage from './pages/Posts/components/PostPage';
import Albums from './pages/Albums/Albums';
import AlbumPage from './pages/Albums/components/AlbumPage';

import AlbumsLayout from './Layout/AlbumsLayout/AlbumsLayout';
import PostsLayout from './Layout/PostsLayout/PostsLayout';
import MainLayout from './Layout/MainLayout/MainLayout';

import './App.css';
import { createContext, useState } from 'react';
import Notifications from './components/Notifications/Notifications';

export const MAIN_URL = 'http://localhost:3000/';

export const NotificationsListContext = createContext(null);

function App() {
	const [NotificationsListContextState, SetNotificationsListContextState] =
		useState([]);
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/" element={<MainLayout />}>
						<Route path="home" element={<Home />} />
						<Route path="todos" element={<Todos />} />

						<Route path="posts" element={<PostsLayout />}>
							<Route index element={<Posts />} />
							<Route path=":postid" element={<PostPage />} />
						</Route>
						<Route path="albums" element={<AlbumsLayout />}>
							<Route index element={<Albums />} />
							<Route path=":photoid" element={<AlbumPage />} />
						</Route>
					</Route>

					<Route path="albums" element={<AlbumsLayout />}>
						<Route index element={<Albums />} />
						<Route
							path=":albumid/:pageid"
							element={<AlbumPage />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
