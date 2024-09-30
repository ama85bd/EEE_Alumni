import { Express, Response, Request } from 'express';
import validate from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
import {
  createUserHandler,
  getInActiveUsersHandler,
} from '../controller/user.controller';
import { requireUser } from '../middleware/requireUser';

function userRoutes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  app.post('/api/users', validate(createUserSchema), createUserHandler);
  app.get('/api/inactiveusers', requireUser, getInActiveUsersHandler);
}

export default userRoutes;
