import { NavLink } from 'react-router-dom';
import EntryHeader from '../../components/EntryHeader';
import LoginForm from './components/LoginForm';

export default function Login() {
	return (
		<>
			<EntryHeader />
			<LoginForm />
			<NavLink to='/register'>
				Don't have an account? Register here.
			</NavLink>
		</>
	);
}
