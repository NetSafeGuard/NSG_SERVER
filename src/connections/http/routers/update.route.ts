import { Router } from 'express';
import { Repo, getUpdate } from '../useCases/Updater/Controller/updater.controller';
export const updaterouter = Router();

updaterouter.get('/',  getUpdate(Repo.NSG_ADMIN));
updaterouter.get('/students', getUpdate(Repo.NSG_STUDENTS))