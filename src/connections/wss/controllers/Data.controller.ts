import type { Socket } from 'socket.io';
import { identify } from '../middlewares/identify.middleware';
import { getUsers } from '@/connections/http/useCases/Accounts/Repository/account.repository';
import { getGroups } from '@http/useCases/Groups/Repository/group.repository';
import { getActivities } from '@/connections/http/useCases/Activities/Repository/activity.repository';

export const getData = (socket: Socket) => async callback => {
	try {
		await new Promise<void>((resolve, reject) => {
			identify(socket, err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});

		console.log(`[🙌] Authenticated user: ${socket.data.user.username}`);

		const [users, groups, activities] = await Promise.all([
			getUsers(),
			getGroups(),
			getActivities(),
		]);

		socket.emit('users', users);
		socket.emit('groups', groups);
		socket.emit('activities', activities);

		if (callback) callback(null, { users, groups, activities });
	} catch (error) {
		console.error('[❌] Authentication error:', error);
		if (callback) callback(error);
	}
};
