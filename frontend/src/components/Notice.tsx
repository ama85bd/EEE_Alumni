'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';

const notices = [
  {
    id: 1,
    title: 'Office Closure',
    date: '2024-10-20',
    message: 'Our office will be closed for maintenance.',
  },
  {
    id: 2,
    title: 'Company Meeting',
    date: '2024-10-22',
    message: 'All staff are required to attend the quarterly meeting.',
  },
  {
    id: 3,
    title: 'New Policy Update',
    date: '2024-10-25',
    message: 'Please review the new company policies updated in the handbook.',
  },
];

const NoticeBoard = () => {
  const [notices, setNotices] = useState<any[]>([]);

  const headersData = {
    'Content-Type': 'application/json', // Modify as needed
  };
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

  useEffect(() => {
    getAllNotice();
  }, []);

  return (
    <div className='w-full mx-auto p-6 mt-4 bg-white rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4'>Notice Board</h2>
      <ul className='space-y-4'>
        {notices.map((notice) => (
          <li
            key={notice._id}
            className='p-4 border-l-4 border-blue-500 bg-gray-50'
          >
            <h3 className='text-lg font-semibold'>{notice.title}</h3>
            <p className='text-sm text-gray-600'>
              {moment(notice.updatedAt).format('LLLL')}
            </p>
            <p className='mt-2 text-gray-800'>{notice.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;
