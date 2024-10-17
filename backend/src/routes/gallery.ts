import { Express, Response, Request } from 'express';
import validate from '../middleware/validateResource';
import { createGallerySchema } from '../schema/gallery.schema';
import { createGalleryHandler } from '../controller/gallery.controller';
import { requireUser } from '../middleware/requireUser';

function galleryRoutes(app: Express) {
  app.post(
    '/api/gallery',
    [requireUser, validate(createGallerySchema)],
    createGalleryHandler
  );
}

export default galleryRoutes;
