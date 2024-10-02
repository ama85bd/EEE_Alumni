'use client';
import Tooltip from '@/components/tooltip';
import { IUser } from '@/models/user';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';

interface pageProps {}

const UserRequest: FC<pageProps> = ({}) => {
  const { data: session, status }: any = useSession();
  const [visible, setVisible] = useState(false);
  const [inactiveUsers, setInactiveUsers] = useState<IUser[]>([]);
  console.log('inactiveUsers', inactiveUsers);
  console.log('session', session?.accessToken);
  const headersData = {
    Authorization: `Bearer ${session?.accessToken}`,
    'x-refresh': `${session?.refreshToken}`,
    'Content-Type': 'application/json', // Modify as needed
  };

  async function inActiveUsers() {
    try {
      await axios
        .get(`http://localhost:1337/api/inactiveusers`, {
          headers: headersData,
        })
        .then((r) => {
          console.log('rrrrrr', r.data);
          setInactiveUsers(r.data);
        });
    } catch (error) {
      // notFound();
      console.log(error);
    }
  }

  useEffect(() => {
    inActiveUsers();
  }, [session?.accessToken]);

  const data = [
    { id: 1, name: 'John Doe', age: 28 },
    { id: 2, name: 'Jane Smith', age: 34 },
    { id: 3, name: 'Mike Johnson', age: 45 },
  ];

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
          {inactiveUsers.map((item, index) => {
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
                    <button className='px-2 py-2 text-red-800'>
                      <RxCross2 className=' text-xl font-bold' />
                    </button>
                  </Tooltip>
                  <Tooltip text='active'>
                    <button className='px-2 py-2 text-green-800'>
                      <TiTick className=' text-2xl font-bold' />
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

export default UserRequest;
