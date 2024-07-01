import { server as express_server } from '@/index';
import { Server } from 'socket.io';
import { createServer, type Server as serverType } from 'node:http';
import * as activityC from '../controllers/Activity.controller';
import * as dataC from '../controllers/Data.controller';

export interface Data {
	activityId: number;
	email: string;
	remove: boolean;
}

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
			socket.on('getData', dataC.getData(socket));

			socket.on('toggleBlock', (data: Data) => activityC.toggleBlock(this.io,socket, data));
			socket.on('joinActivity', activityC.joinActivity(socket));
			socket.on('BlockMe', activityC.blockActivity(this.io, socket));
			socket.on('disconnect', () => {
				console.log('[🙌] Socket client disconnected');
			});
		});

		this.server.listen(3001, () => {
			console.log('[🔮] Socket server is running on port 3001');
		});
	}
}
