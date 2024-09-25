import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  mobileNo: string;
  academicSession: string;
  profession: string;
  designation: string;
  officeAddress: string;
  presentAddress: string;
  permanentAddress: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  isMember: boolean;
  isLifeMember: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    mobileNo: { type: String, require: true },
    academicSession: { type: String, require: true },
    profession: { type: String, require: true },
    designation: { type: String, require: true },
    officeAddress: { type: String, require: true },
    presentAddress: { type: String, require: true },
    permanentAddress: { type: String, require: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, require: true },
    isActive: { type: Boolean, require: true },
    isMember: { type: Boolean, require: true },
    isLifeMember: { type: Boolean, require: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  let user = this as unknown as UserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
