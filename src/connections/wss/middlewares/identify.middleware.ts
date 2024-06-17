import jwt from 'jsonwebtoken';
import { getAccount } from '@http/useCases/Accounts/Repository/account.repository';
import type { Socket } from 'socket.io';

export const identify = (socket: Socket, next: (err?: Error) => void) => {
	const token = socket.handshake.query.token;

	if (token) {
		jwt.verify(token as string, process.env.JWT_SECRET || 'SCR_2023', async (err, user) => {
			if (err) return next(new Error('Authentication error'));
			const newuser = await getAccount((user as any).email);
			if (!newuser) return next(new Error('Authentication error'));
			socket.data.user = {
				email: newuser.email,
				role: newuser.role,
				avatar: newuser.avatar,
				username: newuser.username,
				activated: newuser.activated,
			};
			next();
		});
	} else {
		next(new Error('Authentication error'));
	}
};
