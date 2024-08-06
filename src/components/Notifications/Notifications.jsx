import { useContext } from 'react';
import { NotificationsListContext } from '../../App';
import NotificationItem from './components/NotificationItem';
import styles from './Notifications.module.css';

/**
 * Add a notification to show.
 * @param {'error' | 'success' | 'warn'} type
 * @param {string} message
 */

export function AddNotification(type, message) {
	const [, SetNotificationsListContextState] = useContext(
		NotificationsListContext
	);
	SetNotificationsListContextState((prevNotifications) => [
		...prevNotifications,
		<li key={type + message}>
			<NotificationItem message={message} type={type} />
		</li>,
	]);
}

export default function Notifications() {
	const [NotificationsListContextState] = useContext(
		NotificationsListContext
	);
	return (
		<ul className={styles.Notifications}>
			{NotificationsListContextState.map((item) => item)}
		</ul>
	);
}
