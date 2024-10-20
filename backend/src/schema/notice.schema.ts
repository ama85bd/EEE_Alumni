import { TypeOf, object, string } from 'zod';

export const createNoticeSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    message: string({
      required_error: 'Image is required',
    }),
  }),
});

export type CreateNoticeInput = TypeOf<typeof createNoticeSchema>;

const params = {
  params: object({
    noticeId: string({
      required_error: 'noticeId is required',
    }),
  }),
};

export const getNoticeIdSchema = object({
  ...params,
});

export type GetNoticeId = TypeOf<typeof getNoticeIdSchema>;
