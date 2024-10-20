'use client';
import CommonTable from '@/components/table/CommonTable';
import { INotice } from '@/models/notice';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '@/components/Modal';

interface pageProps {}

interface INoticeTable {
  _id: string;
  message: string;
  title: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  message: Yup.string().required('Message is required'),
});

const NoticePage: FC<pageProps> = ({}) => {
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

  const updateForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      setValue,
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm<any>({
      mode: 'onChange',
      resolver: yupResolver(validationSchema),
    });
    return { register, errors, handleSubmit, setValue, getValues };
  };

  const forms = {
    update: updateForm(),
  };

  const { data: session, status }: any = useSession();
  const headersData = {
    Authorization: `Bearer ${session?.accessToken}`,
    'x-refresh': `${session?.refreshToken}`,
    'Content-Type': 'application/json', // Modify as needed
  };

  const [noticeId, setNoticeId] = useState('');
  const [notices, setNotices] = useState<any[]>([]);
  const [notice, setNotice] = useState<any>();
  console.log('noticeId', noticeId);
  console.log('notice', notice);
  console.log('notices', notices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const columns: any = [
    { Header: 'Title', accessor: 'title' },
    { Header: 'Message', accessor: 'message' },
  ];
  const actions = [
    {
      icon: <FaEdit className='text-teal-500' />,
      label: 'Edit',
      onClick: (row: INoticeTable) => {
        setNoticeId(row._id);
        openModal();
      },
    },
    {
      icon: <FaTrash className='text-red-500' />,
      label: 'Delete',
      onClick: (row: INoticeTable) => {
        setNoticeId(row._id);
        openDeleteModal();
      },
    },
  ];

  async function getAllNotice() {
    try {
      await axios
        .get(`http://localhost:1337/api/notice`, {
          headers: headersData,
        })
        .then((r) => {
          setNotices(r.data);
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function getNoticeById(id: string) {
    try {
      await axios
        .get(`http://localhost:1337/api/notice/${id}`, {
          headers: headersData,
        })
        .then((r) => {
          setNotice(r.data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    getAllNotice();
  }, []);

  useEffect(() => {
    forms.update.setValue('title', notice?.title);
    forms.update.setValue('message', notice?.message);
  }, [forms?.update, notice]);

  useEffect(() => {
    getNoticeById(noticeId);
  }, [noticeId]);

  const handleUpdateFormSubmit = async (data: INotice) => {
    console.log('data update', data);
    const final: INotice = {
      ...data,
    };
    try {
      const response = await fetch(
        `http://localhost:1337/api/notice/${noticeId}`,
        {
          method: 'PUT',
          headers: headersData,
          body: JSON.stringify({
            ...final,
          }),
        }
      );

      if (response.ok) {
        toast.success(`Notice updated successfully..`);
        reset();
        getAllNotice();
        closeModal();
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message); // Throw an error with the server response
      }
    } catch (error: any) {
      toast.error(`${error.message}`);
    }
  };

  const handleFormSubmit = async (data: INotice) => {
    console.log('data add', data);
    const final: INotice = {
      ...data,
    };
    try {
      const response = await fetch('http://localhost:1337/api/notice', {
        method: 'POST',
        headers: headersData,
        body: JSON.stringify({
          ...final,
        }),
      });

      if (response.ok) {
        toast.success(`Notice added successfully..`);
        reset();
        getAllNotice();
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message); // Throw an error with the server response
      }
    } catch (error: any) {
      toast.error(`${error.message}`);
    }
  };

  async function onDeleteNotice(id: string) {
    try {
      await axios
        .delete(`http://localhost:1337/api/notice/${id}`, {
          headers: headersData,
        })
        .then(() => {
          getAllNotice();
          closeDeleteModal();
          toast.success(`Notice deleted successfully..`);
        });
    } catch (error) {
      // notFound();
      console.log(error);
    }
  }

  const deleteNotice = async () => {
    await onDeleteNotice(noticeId);
    closeModal();
  };

  return (
    <>
      <div className='flex w-full justify-center items-center  dark:bg-gray-100 '>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
          className='w-full bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-300'
        >
          <p className='text-2xl font-bold text-teal-800 mb-2'>Add Notice</p>
          <div className='mb-3'>
            <label className='flex items-center cursor-pointer'>
              Title:<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-500 focus:ring-opacity-50 transition'
              {...register('title')}
            />
            {errors.title && (
              <p className='text-red-900'>{errors.title.message}</p>
            )}
          </div>
          <div className='mb-3'>
            <label className='flex items-center cursor-pointer'>
              Message:<span className='text-red-500'>*</span>
            </label>
            <textarea
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-500 focus:ring-opacity-50 transition'
              {...register('message')}
            />
            {errors.message && (
              <p className='text-red-900'>{errors.message.message}</p>
            )}
          </div>
          <button
            type='submit'
            className='text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800'
          >
            Submit
          </button>
        </form>
      </div>
      <CommonTable
        tableHeader={'All Notice'}
        data={notices}
        columns={columns}
        itemsPerPage={10}
        actions={actions}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='flex w-full justify-center items-center  dark:bg-gray-100 '>
          <form
            onSubmit={forms.update.handleSubmit(handleUpdateFormSubmit)}
            noValidate
            className='w-full bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-300'
          >
            <p className='text-2xl font-bold text-teal-800 mb-2'>Add Notice</p>
            <div className='mb-3'>
              <label className='flex items-center cursor-pointer'>
                Title:<span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-500 focus:ring-opacity-50 transition'
                {...forms.update.register('title')}
              />
              {forms.update.errors.title && (
                <p className='text-red-900'>
                  {forms.update.errors.title.message}
                </p>
              )}
            </div>
            <div className='mb-3'>
              <label className='flex items-center cursor-pointer'>
                Message:<span className='text-red-500'>*</span>
              </label>
              <textarea
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-500 focus:ring-opacity-50 transition'
                {...forms.update.register('message')}
              />
              {forms.update.errors.message && (
                <p className='text-red-900'>
                  {forms.update.errors.message.message}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800'
            >
              Update
            </button>
            <button
              type='button'
              className='ml-2 text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
              onClick={closeModal}
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <div>
          <div className='flex space-x-2'>
            <span>Are you sure you want to delete?</span>
            <button
              className='bg-red-500 text-white px-2 py-1 rounded'
              onClick={deleteNotice}
            >
              Yes
            </button>
            <button
              className='bg-gray-300 text-black px-2 py-1 rounded'
              onClick={() => {
                closeDeleteModal();
              }}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NoticePage;
