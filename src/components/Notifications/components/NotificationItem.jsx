import PropTypes from 'prop-types';

import styles from './NotificationItem.module.css';

export default function NotificationItem({ message, type }) {
	return (
		<div className={[styles[type], styles.NotificationItem]}>{message}</div>
	);
}
NotificationItem.propTypes = {
	message: PropTypes.string,
	type: 'error' | 'success' | 'warn',
};
