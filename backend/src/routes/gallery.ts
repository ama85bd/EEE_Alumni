import { Express, Response, Request } from 'express';
import validate from '../middleware/validateResource';
import {
  createGallerySchema,
  getGalleryIdSchema,
} from '../schema/gallery.schema';
import {
  createGalleryHandler,
  deleteGalleryHandler,
  getAllGalleryHandler,
} from '../controller/gallery.controller';
import { requireUser } from '../middleware/requireUser';

function galleryRoutes(app: Express) {
  app.post(
    '/api/gallery',
    [requireUser, validate(createGallerySchema)],
    createGalleryHandler
  );
  app.get('/api/gallery', getAllGalleryHandler);
  app.get(
    '/api/gallery/:galleryId',
    [requireUser, validate(getGalleryIdSchema)],
    deleteGalleryHandler
  );
}

export default galleryRoutes;
