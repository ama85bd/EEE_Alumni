'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

interface galleryProps {}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  image: Yup.mixed()
    .required('An image file is required')
    .test('fileSize', 'The file is too large', function (value: any) {
      const { createError } = this;
      return value[0]
        ? value[0]?.size <= MAX_FILE_SIZE
        : createError({
            path: this.path,
            message: 'An image file is required',
          });
    })
    .test('fileType', 'Unsupported File Format', (value: any) => {
      return (
        value[0] &&
        ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(
          value[0].type
        )
      );
    }),
});

const Gallery: FC<galleryProps> = ({}) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const { data: session, status }: any = useSession();
  const [base64, setBase64] = useState('');
  const [image, setImage] = useState<any>(null);

  const headersData = {
    Authorization: `Bearer ${session?.accessToken}`,
    'x-refresh': `${session?.refreshToken}`,
    'Content-Type': 'application/json', // Modify as needed
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
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

  const handleFormSubmit = async (data: any) => {
    const final: any = {
      ...data,
      image: base64,
    };
    console.log('final', final);
    try {
      const response = await fetch('http://localhost:1337/api/gallery', {
        method: 'POST',
        headers: headersData,
        body: JSON.stringify({
          ...final,
        }),
      });

      if (response.ok) {
        toast.success(`Gallery added successfully..`);
        reset();
        setImage(null);
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message); // Throw an error with the server response
      }
    } catch (error: any) {
      toast.error(`${error.message}`);
    }
  };
  const imageFile: any = watch('image');

  const handleFileChange = (event: any) => {
    setValue('image', event.target.files[0]);
  };

  return (
    <form
      className='flex justify-center items-center space-x-4'
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      <label htmlFor='image' className='flex items-center cursor-pointer'>
        Title:<span className='text-red-500'>*</span>
      </label>
      <div className=''>
        <input
          type='text'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-500 focus:ring-opacity-50 transition'
          {...register('title')}
        />
        {errors.title && (
          <p className='text-red-500 text-sm'>{errors.title.message}</p>
        )}
      </div>
      <label htmlFor='image' className='flex items-center cursor-pointer'>
        Upload Image: <span className='text-red-500'>*</span>
      </label>
      <div>
        <Controller
          name='image'
          control={control}
          defaultValue={''}
          render={({ field: { onChange, onBlur, ref } }) => (
            <input
              type='file'
              accept='image/jpeg,image/jpg, image/png, image/gif'
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

      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
      >
        Submit
      </button>
      {image && (
        <img
          src={image}
          alt='Preview'
          className='w-24 h-24 border rounded-lg overflow-hidden'
        />
      )}
    </form>
  );
};

export default Gallery;
