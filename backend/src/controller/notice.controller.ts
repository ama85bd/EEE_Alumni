import { Request, Response } from 'express';
import { CreateNoticeInput, GetNoticeId } from '../schema/notice.schema';
import {
  createNotice,
  deleteOneNotice,
  findAllNotice,
  findAndUpdateNotice,
  findNoticeById,
} from '../service/notice.service';
import logger from '../utils/logger';

export async function createNoticeHandler(
  req: Request<{}, {}, CreateNoticeInput['body']>,
  res: Response
) {
  try {
    await createNotice(req.body);
    return res.status(200).json('Ok');
  } catch (error: any) {
    logger.error(error);
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: error.message });
    }

    // General error handling
    console.error(error); // Log the entire error for debugging
    res.status(500).send({ message: 'Server error.' });
  }
}

export async function getAllNoticeHandler(req: Request, res: Response) {
  const notices = await findAllNotice();

  return res.send(notices);
}

export async function findAndUpdateNoticeHandler(
  req: Request<GetNoticeId['params'], CreateNoticeInput['body']>,
  res: Response
) {
  const _id = req.params.noticeId;
  const noticeById = await findNoticeById({ _id });
  if (!noticeById) {
    return res.sendStatus(404);
  }
  const notice = req.body;
  await findAndUpdateNotice(
    {
      _id: _id,
    },
    notice,
    {
      upsert: true,
      new: true,
    }
  );

  return res.sendStatus(200);
}

export async function findNoticeByIdHandler(
  req: Request<GetNoticeId['params']>,
  res: Response
) {
  const _id = req.params.noticeId;
  const noticeById = await findNoticeById({ _id });
  if (!noticeById) {
    return res.sendStatus(404);
  }

  return res.send(noticeById);
}

export async function deleteNoticeHandler(
  req: Request<GetNoticeId['params']>,
  res: Response
) {
  const _id = req.params.noticeId;
  const notice = await deleteOneNotice(_id);

  if (!notice) {
    return res.sendStatus(404);
  }

  return res.sendStatus(200);
}
