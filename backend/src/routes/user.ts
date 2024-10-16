import { Express, Response, Request } from 'express';
import validate from '../middleware/validateResource';
import { createUserSchema, getUserIdSchema } from '../schema/user.schema';
import {
  createUserHandler,
  getActiveUsersHandler,
  getInActiveUsersHandler,
  updateActiveUserHandler,
} from '../controller/user.controller';
import { requireUser } from '../middleware/requireUser';

function userRoutes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  app.post('/api/users', validate(createUserSchema), createUserHandler);
  app.get('/api/inactiveusers', requireUser, getInActiveUsersHandler);
  app.get('/api/activeusers', requireUser, getActiveUsersHandler);
  app.get(
    '/api/users/:userId',
    [requireUser, validate(getUserIdSchema)],
    updateActiveUserHandler
  );
}

export default userRoutes;
