import { TypeOf, boolean, object, string } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    mobileNo: string({
      required_error: 'Mobile no is required',
    }),
    academicSession: string({
      required_error: 'Academic session is required',
    }),
    image: string({
      required_error: 'Image is required',
    }),
    profession: string({
      required_error: 'Profession is required',
    }),
    designation: string({
      required_error: 'Profession is required',
    }),
    officeAddress: string({
      required_error: 'Profession is required',
    }),
    presentAddress: string({
      required_error: 'Present address is required',
    }),
    permanentAddress: string({
      required_error: 'Permanent address is required',
    }),
    isAdmin: boolean({
      required_error: 'isActive is required',
    }),
    isActive: boolean({
      required_error: 'isActive is required',
    }),
    isMember: boolean({
      required_error: 'isMember is required',
    }),
    isLifeMember: boolean({
      required_error: 'isLifeMember is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    confirmPassword: string({
      required_error: 'Password Confirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['passwordConfirmation'],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;

const params = {
  params: object({
    userId: string({
      required_error: 'userId is required',
    }),
  }),
};

export const getUserSchema = object({
  ...params,
});

export type GetUserInput = TypeOf<typeof getUserSchema>;
