import { getStudentByCode } from '@/connections/http/useCases/Students/Repository/student.repository';
import {
	CreateLog,
	blockUser,
	getActivities,
	getActivityByCode,
	unblockUser,
} from '@/connections/http/useCases/Activities/Repository/activity.repository';
import type { Server, Socket } from 'socket.io';
import { Priority } from '@prisma/client';
import type { Data } from '../models/server';
import { identify } from '../middlewares/identify.middleware';

export const joinActivity = (socket: Socket) => async (data, callback) => {
	if (!data.usercode || !data.activitycode) return;

	Promise.all([getStudentByCode(data.usercode), getActivityByCode(data.activitycode)])
		.then(([student, activity]) => {
			if (!student) return callback('Código de aluno inválido');
			if (!activity) return callback('Código da atividade inválido');

			if (activity.groups.find(group => group.name === student.group.name)) {
				const start_date = new Date(activity.startDate);
				const end_date = new Date(activity.endDate);

				if (start_date > new Date()) {
					return callback('A atividade ainda não começou');
				}

				if (start_date > end_date) {
					return callback('Essa atividade já encerrou');
				}

				socket.data.user = {
					student,
					activity,
				};

				socket.join(activity.code);
				socket.emit('joined', activity);

				console.log(`[🙌] User ${student.name} joined activity ${activity.title}`);

				if (activity.blockedUsers.find(user => user.id === student.id)) {
					socket.emit('blocked');
				}
				callback(null);
			} else {
				callback('O seu grupo não tem permissão para acessar a esta atividade');
			}
		})
		.catch(e => {
			if (callback)
				callback('Ocorreu algum erro interno, caso o erro continue entre em contacto!');
		});
};

export const blockActivity = (io: Server, socket: Socket) => async callback => {
	if (!socket.data.user) return;

	const activity = await getActivityByCode(socket.data.user.activity.code);

	if (!activity) return;

	if (activity.blockedUsers.find(user => user.id === socket.data.user.student.id)) return;

	await blockUser(socket.data.user.activity.id, socket.data.user.student.email);
	await CreateLog(
		socket.data.user.activity.id,
		socket.data.user.student.id,
		'Bloqueado',
		'Acedeu a um domínio não listado',
		Priority.ALTA,
	);
	getActivities().then(activities => {
		io.emit('activities', activities);
	});

	socket.emit('blocked');

	console.log(`[🚨] User ${socket.data.user.student.name} blocked from activity`);
	callback(null);
};

export const toggleBlock = async (io: Server, socket: Socket, data: Data) => {
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
		const s = findSocketByEmail(io, data.email);
		if (data.remove) {
			unblockUser(data.activityId, data.email).then(() => {
				getActivities().then(activities => {
					io.emit('activities', activities);
					if (s) s.emit('unblocked', data.email);
				});
			});
		} else {
			blockUser(data.activityId, data.email).then(() => {
				getActivities().then(activities => {
					io.emit('activities', activities);

					if (s) s.emit('blocked', data.email);
				});
			});
		}
	} catch (error) {
		console.error('[❌] Authentication error:', error);
	}
};

const findSocketByEmail = (io: Server, email: string) => {
	const sockets = io.sockets.sockets;
	let socket = null;
	for (const s of sockets.values()) {
		if (s.data.user?.student?.email === email) {
			socket = s;
		}
	}

	return socket;
};
