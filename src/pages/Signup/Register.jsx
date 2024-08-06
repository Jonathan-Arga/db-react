import { NavLink } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import EntryHeader from '../../components/EntryHeader';

export default function Register() {
	return (
		<>
			<EntryHeader />
			<RegisterForm />
			<NavLink to="/login">Already have an account? Login here!</NavLink>
		</>
	);
}
