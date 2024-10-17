import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

interface Column<T> {
  Header: string;
  accessor: keyof T; // Use keyof to enforce valid accessors
  Cell?: (row: T) => React.ReactNode; // Custom render function for cell
}

interface Action {
  icon: React.ReactNode;
  label: string;
  onClick: (row: any) => void; // Action handler with row data
}

interface CommonTableProps<T> {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  actions?: Action[];
  tableHeader?: string;
}

const CommonTable = <T,>({
  data,
  columns,
  itemsPerPage = 5,
  actions,
  tableHeader,
}: CommonTableProps<T>) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {tableHeader && (
        <p className='text-xl font-bold mb-0 text-teal-50 bg-teal-700 p-2 rounded-t-md'>
          {tableHeader}
        </p>
      )}
      <div className='overflow-x-auto'>
        <table className='min-w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border border-gray-300 p-2 text-center'>No</th>
              {columns.map((column) => (
                <th
                  key={column.accessor.toString()}
                  className='border border-gray-300 p-2 text-center'
                >
                  {column.Header}
                </th>
              ))}
              {actions && (
                <th className='border border-gray-300 p-2 text-center'>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row: any, index) => (
              <tr key={index} className='hover:bg-gray-100'>
                <td className='border border-gray-300 p-2 text-center'>
                  {startIndex + index + 1}
                </td>
                {columns.map((column: any) => (
                  <td
                    key={column.accessor.toString()}
                    className='border border-gray-300 p-2 text-center align-middle'
                  >
                    {column.Cell ? column.Cell(row) : row[column.accessor]}
                  </td>
                ))}
                {actions && (
                  <td className='border border-gray-300 p-2 text-center'>
                    {actions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => action.onClick(row)}
                        className='mr-2 p-1'
                        title={action.label}
                      >
                        {action.icon}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className='mt-4 flex justify-end'>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className='px-4  text-black disabled:opacity-50'
          >
            <IoIosArrowBack className=' text-2xl font-bold' />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className='px-4  text-black disabled:opacity-50'
          >
            <IoIosArrowForward className=' text-2xl font-bold' />
          </button>
        </div>
      </div>
    </>
  );
};

export default CommonTable;
