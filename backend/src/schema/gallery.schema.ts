import { TypeOf, object, string } from 'zod';

export const createGallerySchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    image: string({
      required_error: 'Image is required',
    }),
  }),
});

export type CreateGalleryInput = TypeOf<typeof createGallerySchema>;

const params = {
  params: object({
    galleryId: string({
      required_error: 'galleryId is required',
    }),
  }),
};

export const getGalleryIdSchema = object({
  ...params,
});

export type GetGalleryId = TypeOf<typeof getGalleryIdSchema>;
