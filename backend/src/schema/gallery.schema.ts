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
