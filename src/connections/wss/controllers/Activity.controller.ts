import { getStudentByCode } from "@/connections/http/useCases/Students/Repository/student.repository";
import { CreateLog, blockUser, getActivityByCode } from "@/connections/http/useCases/Activities/Repository/activity.repository";
import type { Socket } from "socket.io";
import { Priority } from "@prisma/client";

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

				if(activity.blockedUsers.find(user => user.id === student.id)) {
					socket.emit('blocked');
					return
				}

				socket.data.user = {
					student,
					activity
				};


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
				callback('Ocorreu algum erro interno, caso o erro continue entre em contacto!');
		});
};

export const blockActivity = (socket: Socket) => async (callback) => {
	if (!socket.data.user) return;
	await blockUser(socket.data.user.activity.id, socket.data.user.student.id);
	await CreateLog(socket.data.user.activity.id, socket.data.user.student.id, 'Bloqueado', 'Acessou a algo que não deveria', Priority.ALTA);
	socket.leave(socket.data.user.activity.code);
	socket.emit('blocked');

	console.log(`[🚨] User ${socket.data.user.student.name} blocked from activity`);
	callback(null);
};