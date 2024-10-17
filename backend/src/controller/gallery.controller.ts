import { Request, Response } from 'express';
import { CreateGalleryInput } from '../schema/gallery.schema';
import { createGallery } from '../service/gallery.service';
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
