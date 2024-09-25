import { Express } from 'express';
import validate from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
import { createUserHandler } from '../controller/user.controller';

function userRoutes(app: Express) {
  app.post('/api/users', validate(createUserSchema), createUserHandler);
}

export default userRoutes;
