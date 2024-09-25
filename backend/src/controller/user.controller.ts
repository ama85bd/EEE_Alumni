import { Response, Request } from 'express';
import logger from '../utils/logger';
import { createUser, findUser, findUserById } from '../service/user.service';
import { CreateUserInput, GetUserInput } from '../schema/user.schema';
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getUserHandler(
  req: Request<GetUserInput['params']>,
  res: Response
) {
  const _id = req.params.userId;
  const user = await findUserById({ _id });

  if (!user) {
    return res.sendStatus(404);
  }

  return res.send(user);
}
