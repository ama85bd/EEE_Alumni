import mongoose from 'mongoose';

export interface NoticeDocument extends mongoose.Document {
  title: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    message: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const NoticeModel = mongoose.model<NoticeDocument>('Notice', noticeSchema);

export default NoticeModel;
