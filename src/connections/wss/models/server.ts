import { server as express_server } from '@/index';
import { Server } from 'socket.io';
import { createServer, type Server as serverType } from 'node:http';
import { identify } from '../middlewares/identify.middleware';
import { getUsers } from '@/connections/http/useCases/Accounts/Repository/account.repository';
import { getGroups } from '@http/useCases/Groups/Repository/group.repository';
import {
	getActivities,
	getActivityByCode,
} from '@/connections/http/useCases/Activities/Repository/activity.repository';
import { getStudentByCode } from '@/connections/http/useCases/Students/Repository/student.repository';

export class SocketServer {
	public io: Server;
	public server: serverType;

	constructor() {
		this.server = createServer(express_server.app);
		this.io = new Server(this.server, {
			cors: {
				origin: '*',
				methods: ['GET', 'POST'],
			},
		});
	}

	start() {
		this.io.on('connection', async socket => {
			socket.on('getData', async callback => {
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
			});

			socket.on('joinActivity', async (data, callback) => {
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

							socket.data.user = student;

							socket.join(activity.code);
							socket.emit('joined', activity);

							console.log(`[🙌] User ${student.name} joined activity ${activity.title}`);  
							callback(null);
						} else {
							callback('O seu grupo não tem permissão para acessar a esta atividade');
						}
					})
					.catch(e => {
						if (callback)
							callback(
								'Ocorreu algum erro interno, caso o erro continue entre em contacto!',
							);
					});
			});

			socket.on('disconnect', () => {
				console.log('[🙌] Socket client disconnected');
			});
		});

		this.server.listen(3001, () => {
			console.log('[🔮] Socket server is running on port 3001');
		});
	}
}
