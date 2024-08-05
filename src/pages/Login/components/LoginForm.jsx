import { useState } from "react";

export default function LoginForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function submitLogin(e) {
		e.preventDefault();
	}

	return (
		<form onSubmit={submitLogin}>
			<input
				type="text"
				name="username"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="text"
				name="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button>LOGIN</button>
		</form>
	);
}
