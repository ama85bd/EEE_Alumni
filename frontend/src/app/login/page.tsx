'use client';
import Link from 'next/link';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface pageProps {}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(emailRegex, 'Email must be valid and include a dot in the domain'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Login: FC<pageProps> = ({}) => {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: any) => {
    signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: '/',
    }).then((res) => {
      if (res?.error) {
        console.log('res.error', res);
        setError('email', { message: res.error, type: 'error' });
      } else {
        router.push('/');
      }
    });
  };

  return (
    <div className='flex items-center justify-center bg-gray-100'>
      <div className='h-1/3 w-full max-w-sm'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white p-8 rounded shadow-md'
        >
          <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              {...register('email')}
              className={`w-full p-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded`}
              placeholder='you@example.com'
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='password'>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className={`w-full p-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded`}
                placeholder='********'
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
                  <FaEyeSlash className='dark:text-black' />
                ) : (
                  <FaEye className='dark:text-black' />
                )}
              </button>
            </div>
            {/* <input
              type='password'
              id='password'
              {...register('password')}
              className={`w-full p-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded`}
              placeholder='********'
            /> */}
            {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
            )}
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'
          >
            Login
          </button>
          <p className='mt-4 text-center'>
            Don't have an account?{' '}
            <Link href='/register' className='text-blue-500 hover:underline'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
