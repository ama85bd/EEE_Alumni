import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { omit } from 'lodash';
import { ObjectId } from 'mongodb';
import UserModel, { UserDocument } from '../model/user.model';

export async function createUser(input: FilterQuery<UserDocument>) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), 'password');
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }
  return omit(user.toJSON(), 'password');
}

export async function findActiveInactiveUsers(
  query: FilterQuery<UserDocument>
) {
  const inActiveUsers = UserModel.find(query)
    .select('-password -__v -image -createdAt -updatedAt')
    .lean();
  return inActiveUsers;
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

export async function findUserById(
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) {
  const userId = { _id: ObjectId.createFromHexString(query._id) };
  const user = await UserModel.findOne(userId, {}, options);
  return omit(user, 'password', 'image');
}

export async function updateUserActive(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>
) {
  return UserModel.updateOne(query, update);
}

export async function deleteOneUser(id: string) {
  return UserModel.deleteOne({ _id: id });
}
