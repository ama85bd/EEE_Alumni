import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import NoticeModel, { NoticeDocument } from '../model/notice.model';
import { ObjectId } from 'mongodb';

export async function createNotice(input: FilterQuery<NoticeDocument>) {
  try {
    const notice = await NoticeModel.create(input);
    return notice.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findAllNotice() {
  return await NoticeModel.find().lean().sort({ updatedAt: -1 });
}

export async function findNoticeById(
  query: FilterQuery<NoticeDocument>,
  options: QueryOptions = { lean: true }
) {
  const id = { _id: ObjectId.createFromHexString(query._id) };
  const notice = await NoticeModel.findOne(id, {}, options);
  return notice;
}

export async function findAndUpdateNotice(
  query: FilterQuery<NoticeDocument>,
  update: UpdateQuery<NoticeDocument>,
  options: QueryOptions = {}
) {
  return NoticeModel.findOneAndUpdate(query, update, options);
}

export async function deleteOneNotice(id: string) {
  return NoticeModel.deleteOne({ _id: id });
}
