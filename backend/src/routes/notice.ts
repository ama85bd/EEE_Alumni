import { Express } from 'express';
import {
  createNoticeHandler,
  deleteNoticeHandler,
  findAndUpdateNoticeHandler,
  findNoticeByIdHandler,
  getAllNoticeHandler,
} from '../controller/notice.controller';
import { requireUser } from '../middleware/requireUser';
import validate from '../middleware/validateResource';
import { createNoticeSchema, getNoticeIdSchema } from '../schema/notice.schema';

function noticeRoutes(app: Express) {
  app.post(
    '/api/notice',
    [requireUser, validate(createNoticeSchema)],
    createNoticeHandler
  );
  app.get('/api/notice', getAllNoticeHandler);
  app.put(
    '/api/notice/:noticeId',
    [requireUser, validate(getNoticeIdSchema)],
    findAndUpdateNoticeHandler
  );
  app.get(
    '/api/notice/:noticeId',
    [requireUser, validate(getNoticeIdSchema)],
    findNoticeByIdHandler
  );
  app.delete(
    '/api/notice/:noticeId',
    [requireUser, validate(getNoticeIdSchema)],
    deleteNoticeHandler
  );
}

export default noticeRoutes;
