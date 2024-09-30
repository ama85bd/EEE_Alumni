import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import {
  createSession,
  findSessions,
  updateSession,
} from '../service/session.service';
import { sighJwt } from '../utils/jwt.utils';
import config from 'config';

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user: any = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }

  if (!user.isActive) {
    return res.status(400).send({ message: 'You are not allowed to login.' });
  }

  // create a session
  const session = await createSession(user._id, req.get('user-agent') || '');

  // create an access token
  const accessToken = sighJwt(
    {
      id: user._id,
      session: session._id,
    },
    'accessTokenPrivateKey',
    { expiresIn: config.get('accessTokenTtl') } // 15 minutes
  );
  // create a refresh token
  const refreshToken = sighJwt(
    {
      id: user._id,
      session: session._id,
    },
    'refreshTokenPrivateKey',
    { expiresIn: config.get('refreshTokenTtl') } // one year
  );

  // return access and refresh tokens
  return res.send({
    accessToken,
    refreshToken,
    name: user.name,
    userId: user._id,
    email: user.email,
    userType: [
      { admin: user.isAdmin },
      { member: user.isMember },
      { lifeMember: user.isLifeMember },
    ],
  });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;
  await updateSession({ _id: sessionId }, { valid: false });
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
