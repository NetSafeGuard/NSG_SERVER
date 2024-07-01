import { server as express_server } from '@/index';
import { Server } from 'socket.io';
import { createServer, type Server as serverType } from 'node:http';
import * as activityC from '../controllers/Activity.controller';
import * as dataC from '../controllers/Data.controller';

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

			socket.on('joinActivity', activityC.joinActivity(socket));
			socket.on('BlockMe', activityC.blockActivity(socket));
			socket.on('disconnect', () => {
				console.log('[🙌] Socket client disconnected');
			});
		});

		this.server.listen(3001, () => {
			console.log('[🔮] Socket server is running on port 3001');
		});
	}
}
