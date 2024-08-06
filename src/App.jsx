import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Signup/Register';
import Home from './pages/Home/Home';
import Todos from './pages/Todos/Todos';
import Posts from './pages/Posts/Posts';
import PostItem from './pages/Posts/components/PostItem';
import Albums from './pages/Albums/Albums';
import AlbumItem from './pages/Albums/components/AlbumItem';

import AlbumsLayout from './Layout/AlbumsLayout/AlbumsLayout';
import PostsLayout from './Layout/PostsLayout/PostsLayout';
import MainLayout from './Layout/MainLayout/MainLayout';

import './App.css';
import { createContext, useState } from 'react';

export const MAIN_URL = 'http://localhost:3000/';

export const DeletingPostsContext = createContext(null);

function App() {
	const [DeletingPostsContextState, SetDeletingPostsContextState] =
		useState(false);
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<MainLayout />}>
					<Route path="home" element={<Home />} />
					<Route path="todos" element={<Todos />} />
					<DeletingPostsContext.Provider
						value={[
							DeletingPostsContextState,
							SetDeletingPostsContextState,
						]}
					>
						<Route path="posts" element={<PostsLayout />}>
							<Route index element={<Posts />} />
							<Route path=":postid" element={<PostItem />} />
						</Route>
					</DeletingPostsContext.Provider>
					<Route path="albums" element={<AlbumsLayout />}>
						<Route index element={<Albums />} />
						<Route path=":photoid" element={<AlbumItem />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
