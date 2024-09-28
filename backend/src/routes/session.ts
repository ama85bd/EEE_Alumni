import { Express, Response, Request } from 'express';
import validate from '../middleware/validateResource';
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from '../controller/session.controller';
import { createSessionSchema } from '../schema/session.schema';

function sessionRoutes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post(
    '/api/login',
    validate(createSessionSchema),
    createUserSessionHandler
  );

  // app.get('/api/sessions', requireUser, getUserSessionHandler);
  // app.delete('/api/sessions', requireUser, deleteSessionHandler);
}

export default sessionRoutes;
