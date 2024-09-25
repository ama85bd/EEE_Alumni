'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
    .min(10, 'Address must be at least 10 characters long')
    .max(200, 'Address must be less than 200 characters')
    .required('Office address is required'),
  presentAddress: Yup.string()
    .min(10, 'Address must be at least 10 characters long')
    .max(200, 'Address must be less than 200 characters')
    .required('Present address is required'),
  permanentAddress: Yup.string()
    .min(10, 'Address must be at least 10 characters long')
    .max(200, 'Address must be less than 200 characters')
    .required('Permanent Address is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
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
    .test('fileSize', 'File size is too large (max 1MB)', (value) => {
      return value && value[0] && value[0].size <= 1024 * 1024; // 1MB
    })
    .test('fileType', 'Only images are allowed (jpeg, png, gif)', (value) => {
      return (
        value &&
        value[0] &&
        ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type)
      );
    })
    .required('Image is required'),
});

const Page = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFormSubmit = async (data: unknown) => {
    console.log('data', data);
  };

  return (
    <div className='flex justify-center items-center bg-gray-200  '>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className='mb-2 min-w-96'>
          <div>
            <label className='block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white'>
              Name:<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('name')}
            />
            {errors.name && (
              <p className='text-red-900'>{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className='block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white'>
              Email:<span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-red-900'>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className='block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white'>
              Mobile No:<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('mobileNo')}
            />
            {errors.mobileNo && (
              <p className='text-red-900'>{errors.mobileNo.message}</p>
            )}
          </div>

          <div>
            <label className='block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white'>
              Session:<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('academicSession')}
            />
            {errors.academicSession && (
              <p className='text-red-900'>{errors.academicSession.message}</p>
            )}
          </div>

          <div>
            <label className='block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white'>
              Profession:<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('profession')}
            />
            {errors.profession && (
              <p className='text-red-900'>{errors.profession.message}</p>
            )}
          </div>

          <div>
            <label className='block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white'>
              Designation:<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('designation')}
            />
            {errors.designation && (
              <p className='text-red-900'>{errors.designation.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='presentAddress'
              className='block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white'
            >
              Office Address:<span className='text-red-500'>*</span>
            </label>
            <Controller
              name='officeAddress'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <textarea
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
            <label
              htmlFor='presentAddress'
              className='block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white'
            >
              Present Address:<span className='text-red-500'>*</span>
            </label>
            <Controller
              name='presentAddress'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <textarea
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
            <label
              htmlFor='presentAddress'
              className='block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white'
            >
              Permanent Address:<span className='text-red-500'>*</span>
            </label>
            <Controller
              name='permanentAddress'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <textarea
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
            <label className='block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-white'>
              Password:<span className='text-red-500'>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-900'>{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className='block mt-3 mb-1text-sm font-medium text-gray-900 dark:text-white'>
              Confirm Password:<span className='text-red-500'>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className='text-red-900'>{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='image'
              className='block text-sm font-medium text-gray-700'
            >
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
