import { FilterQuery, UpdateQuery } from 'mongoose';
import { get } from 'lodash';
import { findUser } from './user.service';
import config from 'config';
import SessionModel, { SessionDocument } from '../model/session.model';
import { sighJwt, verifyJwt } from '../utils/jwt.utils';

export async function createSession(userId: any, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken, 'refreshTokenPublicKey');

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  // create an access token
  const accessToken = sighJwt(
    {
      id: user._id,
      session: session._id,
    },
    'accessTokenPrivateKey',
    { expiresIn: config.get('accessTokenTtl') } // 15 minutes
  );

  return accessToken;
}
