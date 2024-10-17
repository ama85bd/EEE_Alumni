import mongoose from 'mongoose';

export interface GalleryDocument extends mongoose.Document {
  title: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    image: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const GalleryModel = mongoose.model<GalleryDocument>('Gallery', gallerySchema);

export default GalleryModel;
