import { Request, Response } from 'express';
import { CreateGalleryInput, GetGalleryId } from '../schema/gallery.schema';
import {
  createGallery,
  deleteOneGallery,
  findAllGallery,
} from '../service/gallery.service';
import logger from '../utils/logger';

export async function createGalleryHandler(
  req: Request<{}, {}, CreateGalleryInput['body']>,
  res: Response
) {
  try {
    const user = await createGallery(req.body);
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

export async function getAllGalleryHandler(req: Request, res: Response) {
  const galleries = await findAllGallery();
  console.log('galleries', galleries);

  return res.send(galleries);
}

export async function deleteGalleryHandler(
  req: Request<GetGalleryId['params']>,
  res: Response
) {
  const _id = req.params.galleryId;
  const gallery = await deleteOneGallery(_id);

  if (!gallery) {
    return res.sendStatus(404);
  }

  return res.sendStatus(200);
}
