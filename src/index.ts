import 'dotenv/config';
import { ExpressServer } from './models/server.model';

const server = new ExpressServer();
server.start();