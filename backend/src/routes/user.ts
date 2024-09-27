import { Express, Response, Request } from 'express';
import validate from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
import { createUserHandler } from '../controller/user.controller';

function userRoutes(app: Express) {
  app.post('/api/users', validate(createUserSchema), createUserHandler);
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
}

export default userRoutes;
