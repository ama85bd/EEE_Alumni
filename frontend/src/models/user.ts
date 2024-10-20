export interface IUser {
  _id: string;
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
  image: string;
  isAdmin?: boolean;
  isActive?: boolean;
  isMember?: boolean;
  isLifeMember?: boolean;
}
