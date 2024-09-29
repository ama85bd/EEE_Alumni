'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import TailwindStyles from '@/utils/TailwindCss';
import { IUser } from '@/models/user';
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  profession: Yup.string().required('Profession is required'),
  designation: Yup.string().required('Designation is required'),
  mobileNo: Yup.string()
    .matches(/^\d{11}$/, 'Mobile number must be exactly 11 digits')
    .required('Mobile number is required'),
  academicSession: Yup.string()
    .matches(/^[0-9-]*$/, 'Only numbers and one hyphen are allowed')
    .test('single-hyphen', 'Only one hyphen is allowed', (value) => {
      const hyphenCount = value ? (value.match(/-/g) || []).length : 0;
      return hyphenCount <= 1;
    })
    .required('Session is required'),
  email: Yup.string().email('Email is not valid').required('Email is required'),
  officeAddress: Yup.string()
    .min(10, 'Office address must be at least 10 characters long')
    .max(200, 'Office address must be less than 200 characters')
    .required('Office address is required'),
  presentAddress: Yup.string()
    .min(10, 'Present address must be at least 10 characters long')
    .max(200, 'Present address must be less than 200 characters')
    .required('Present address is required'),
  permanentAddress: Yup.string()
    .min(10, 'Permanent address must be at least 10 characters long')
    .max(200, 'Permanent address must be less than 200 characters')
    .required('Permanent Address is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*]/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
  image: Yup.mixed()
    .required('An image is required')
    .test('fileSize', 'File size is too large (max: 1MB)', (value: any) => {
      return value && value[0]?.size <= 1048576; // 1 MB in bytes
    })
    .test('fileType', 'Unsupported File Format', (value: any) => {
      return (
        value &&
        ['image/jpeg', 'image/png', 'image/gif'].includes(value[0]?.type)
      );
    }),
});

const Page = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [base64, setBase64] = useState('');
  const [image, setImage] = useState<any>(null);

  const maxFileSizeInMB = 1;
  const maxFileSizeInKB = 1024 * 1024 * maxFileSizeInMB;

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file.size > maxFileSizeInKB) {
      return;
    }
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const base64String = e.target.result;
        setBase64(base64String);
      };
      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (data: IUser) => {
    const final: IUser = {
      ...data,
      image: base64,
      isActive: false,
      isAdmin: false,
      isMember: false,
      isLifeMember: false,
    };

    try {
      const response = await fetch('http://localhost:1337/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...final,
        }),
      });

      if (response.ok) {
        toast.success(`User added successfully..`);
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message); // Throw an error with the server response
      }

      const user = await response.json();
      // Handle successful user creation (e.g., redirect, show success message)
    } catch (error: any) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <div className='flex justify-center items-center  dark:bg-gray-100 '>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className='mb-2 min-w-96'>
          <div>
            <label className={TailwindStyles.label}>
              Name:<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className={TailwindStyles.input}
              {...register('name')}
            />
            {errors.name && (
              <p className='text-red-900'>{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className={TailwindStyles.label}>
              Email:<span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              className={TailwindStyles.input}
              {...register('email')}
            />
            {errors.email && (
              <p className='text-red-900'>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className={TailwindStyles.label}>
              Mobile No:<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className={TailwindStyles.input}
              {...register('mobileNo')}
            />
            {errors.mobileNo && (
              <p className='text-red-900'>{errors.mobileNo.message}</p>
            )}
          </div>

          <div>
            <label className={TailwindStyles.label}>
              Session:<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className={TailwindStyles.input}
              {...register('academicSession')}
            />
            {errors.academicSession && (
              <p className='text-red-900'>{errors.academicSession.message}</p>
            )}
          </div>

          <div>
            <label className={TailwindStyles.label}>
              Profession:<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className={TailwindStyles.input}
              {...register('profession')}
            />
            {errors.profession && (
              <p className='text-red-900'>{errors.profession.message}</p>
            )}
          </div>

          <div>
            <label className={TailwindStyles.label}>
              Designation:<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className={TailwindStyles.input}
              {...register('designation')}
            />
            {errors.designation && (
              <p className='text-red-900'>{errors.designation.message}</p>
            )}
          </div>

          <div>
            <label htmlFor='presentAddress' className={TailwindStyles.label}>
              Office Address:<span className='text-red-500'>*</span>
            </label>
            <Controller
              name='officeAddress'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <textarea
                  className={TailwindStyles.input}
                  {...field}
                  placeholder='Enter your office address'
                  rows={4}
                  cols={50}
                />
              )}
            />
            {errors.officeAddress && (
              <p className='text-red-900'>{errors.officeAddress.message}</p>
            )}
          </div>

          <div>
            <label htmlFor='presentAddress' className={TailwindStyles.label}>
              Present Address:<span className='text-red-500'>*</span>
            </label>
            <Controller
              name='presentAddress'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <textarea
                  className={TailwindStyles.input}
                  {...field}
                  placeholder='Enter your present address'
                  rows={4}
                  cols={50}
                />
              )}
            />
            {errors.presentAddress && (
              <p className='text-red-900'>{errors.presentAddress.message}</p>
            )}
          </div>

          <div>
            <label htmlFor='presentAddress' className={TailwindStyles.label}>
              Permanent Address:<span className='text-red-500'>*</span>
            </label>
            <Controller
              name='permanentAddress'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <textarea
                  className={TailwindStyles.input}
                  {...field}
                  placeholder='Enter your permanent address'
                  rows={4}
                  cols={50}
                />
              )}
            />
            {errors.permanentAddress && (
              <p className='text-red-900'>{errors.permanentAddress.message}</p>
            )}
          </div>

          <div>
            <label className={TailwindStyles.label}>
              Password:<span className='text-red-500'>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className={TailwindStyles.input}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                {showPassword ? (
                  <FaEyeSlash className='dark:text-white' />
                ) : (
                  <FaEye className='dark:text-white' />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-900'>{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className={TailwindStyles.label}>
              Confirm Password:<span className='text-red-500'>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                className={TailwindStyles.input}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className='dark:text-white' />
                ) : (
                  <FaEye className='dark:text-white' />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className='text-red-900'>{errors.confirmPassword.message}</p>
            )}
          </div>

          {image && (
            <img
              src={image}
              alt='Preview'
              className='mt-4 border rounded shadow max-h-[150px] max-w-[150px] object-cover'
            />
          )}

          <div>
            <label htmlFor='image' className={TailwindStyles.label}>
              Upload Image <span className='text-red-500'>*</span>
            </label>
            <Controller
              name='image'
              control={control}
              defaultValue={''}
              render={({ field: { onChange, onBlur, ref } }) => (
                <input
                  type='file'
                  accept='image/jpeg, image/png, image/gif'
                  onChange={(event) => {
                    onChange(event.target.files);
                    handleImageChange(event);
                  }}
                  onBlur={onBlur}
                  ref={ref}
                />
              )}
            />
            {errors.image && (
              <p className='text-red-500 text-sm'>{errors.image.message}</p>
            )}
          </div>
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
