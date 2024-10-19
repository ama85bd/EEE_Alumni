'use client';
import Tooltip from '@/components/tooltip';
import { IUser } from '@/models/user';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { MdDisabledByDefault } from 'react-icons/md';
import { MdOutlineDisabledByDefault } from 'react-icons/md';
import CommonTable from '@/components/table/CommonTable';

interface pageProps {}

const UserActive: FC<pageProps> = ({}) => {
  const { data: session, status }: any = useSession();
  const [visible, setVisible] = useState(false);
  const [activeUsers, setActiveUsers] = useState<IUser[]>([]);

  const columns: any = [
    { Header: 'Name', accessor: 'name' },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Mobile No',
      accessor: 'mobileNo',
    },
    {
      Header: 'Academic Session',
      accessor: 'academicSession',
    },
    {
      Header: 'Actions',
      accessor: 'id',
      Cell: (row: any) => {
        console.log('row', row.image);
        return (
          <>
            <Tooltip text='remove'>
              <button
                className={`px-2 py-2 ${
                  row.email === session?.user?.email
                    ? 'text-gray-300'
                    : 'text-red-800'
                }`}
                disabled={row.email === session?.user?.email}
              >
                <MdDisabledByDefault className=' text-2xl font-bold' />
              </button>
            </Tooltip>
            <Tooltip text='inactive'>
              <button
                className={`px-2 py-2 ${
                  row.email === session?.user?.email
                    ? 'text-gray-300'
                    : 'text-amber-500'
                }`}
                onClick={() => onActiveUser(row._id)}
                disabled={row.email === session?.user?.email}
              >
                <MdOutlineDisabledByDefault className=' text-2xl font-bold' />
              </button>
            </Tooltip>
          </>
        );
      },
    },
  ];

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
    try {
      await axios
        .get(`http://localhost:1337/api/users/${id}`, { headers: headersData })
        .then((r) => {
          inActiveUsers();
        });
    } catch (error) {
      // notFound();
      console.log(error);
    }
  }
  return (
    <CommonTable
      tableHeader={'Active User List'}
      data={activeUsers}
      columns={columns}
      itemsPerPage={10}
    />
  );
};

export default UserActive;
