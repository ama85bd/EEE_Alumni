import { FilterQuery } from 'mongoose';
import GalleryModel, { GalleryDocument } from '../model/gallery.model';

export async function createGallery(input: FilterQuery<GalleryDocument>) {
  try {
    const gallery = await GalleryModel.create(input);
    return gallery.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findAllGallery() {
  return GalleryModel.find().lean();
}

export async function deleteOneGallery(id: string) {
  return GalleryModel.deleteOne({ _id: id });
}
