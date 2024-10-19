import React from 'react';

const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 shadow-lg max-w-lg w-full'>
        {/* <button
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          &times;
        </button> */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
