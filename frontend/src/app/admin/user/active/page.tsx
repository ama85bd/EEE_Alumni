'use client';
import Tooltip from '@/components/tooltip';
import { IUser } from '@/models/user';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { MdDisabledByDefault } from 'react-icons/md';
import { MdOutlineDisabledByDefault } from 'react-icons/md';

interface pageProps {}

const UserActive: FC<pageProps> = ({}) => {
  const { data: session, status }: any = useSession();
  const [visible, setVisible] = useState(false);
  const [activeUsers, setActiveUsers] = useState<IUser[]>([]);
  const headersData = {
    Authorization: `Bearer ${session?.accessToken}`,
    'x-refresh': `${session?.refreshToken}`,
    'Content-Type': 'application/json', // Modify as needed
  };

  async function inActiveUsers() {
    try {
      await axios
        .get(`http://localhost:1337/api/activeusers`, {
          headers: headersData,
        })
        .then((r) => {
          setActiveUsers(r.data);
        });
    } catch (error) {
      // notFound();
      console.log(error);
    }
  }

  useEffect(() => {
    inActiveUsers();
  }, [session?.accessToken]);

  async function onActiveUser(id: string) {
    console.log('user id', id);

    try {
      await axios
        .get(`http://localhost:1337/api/users/${id}`, { headers: headersData })
        .then((r) => {
          console.log('rrrrrrr', r);
          inActiveUsers();
        });
    } catch (error) {
      // notFound();
      console.log(error);
    }
  }
  return (
    <div className='flex justify-center'>
      <table className='min-w-full border-collapse border border-gray-300'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border border-gray-300 px-4 py-2 text-center'>No</th>
            <th className='border border-gray-300 px-4 py-2 text-center'>
              Name
            </th>
            <th className='border border-gray-300 px-4 py-2 text-center'>
              Email
            </th>
            <th className='border border-gray-300 px-4 py-2 text-center'>
              Mobile
            </th>
            <th className='border border-gray-300 px-4 py-2 text-center'>
              Session
            </th>
            <th className='border border-gray-300 px-4 py-2 text-center'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {activeUsers.map((item, index) => {
            return (
              <tr key={index} className='hover:bg-gray-100'>
                <td className='border border-gray-300 px-4 py-2 text-center'>
                  {index + 1}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center'>
                  {item.name}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center'>
                  {item.email}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center'>
                  {item.mobileNo}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center'>
                  {item.academicSession}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center'>
                  <Tooltip text='remove'>
                    <button
                      className={`px-2 py-2 ${
                        item.email === session?.user?.email
                          ? 'text-gray-300'
                          : 'text-red-800'
                      }`}
                      disabled={item.email === session?.user?.email}
                    >
                      <MdDisabledByDefault className=' text-2xl font-bold' />
                    </button>
                  </Tooltip>
                  <Tooltip text='inactive'>
                    <button
                      className={`px-2 py-2 ${
                        item.email === session?.user?.email
                          ? 'text-gray-300'
                          : 'text-amber-500'
                      }`}
                      onClick={() => onActiveUser(item._id)}
                      disabled={item.email === session?.user?.email}
                    >
                      <MdOutlineDisabledByDefault className=' text-2xl font-bold' />
                    </button>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserActive;
