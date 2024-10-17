import { Express, Response, Request } from 'express';
import validate from '../middleware/validateResource';
import { createGallerySchema } from '../schema/gallery.schema';
import {
  createGalleryHandler,
  getAllGalleryHandler,
} from '../controller/gallery.controller';
import { requireUser } from '../middleware/requireUser';

function galleryRoutes(app: Express) {
  app.post(
    '/api/gallery',
    [requireUser, validate(createGallerySchema)],
    createGalleryHandler
  );
  app.get('/api/gallery', requireUser, getAllGalleryHandler);
}

export default galleryRoutes;
