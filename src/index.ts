import 'dotenv/config';
import { ExpressServer } from './models/server.models';

const server = new ExpressServer();
server.start();