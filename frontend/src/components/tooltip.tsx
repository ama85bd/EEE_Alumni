import { FC, useState } from 'react';

interface tooltipProps {
  children: any;
  text: any;
  position?: any;
}

const Tooltip: FC<tooltipProps> = ({ children, text, position = 'top' }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className='relative inline-block'>
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className='cursor-pointer'
      >
        {children}
      </div>
      {visible && (
        <div
          className={`absolute z-10 p-2 text-sm text-white bg-black rounded shadow-lg transition-opacity duration-300 ${
            position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
          }`}
        >
          {text}
          <div
            className={`absolute w-2 h-2 transform rotate-45 bg-black ${
              position === 'top'
                ? 'top-full left-1/2 -mt-1 -ml-1'
                : 'bottom-full left-1/2 mt-1 -ml-1'
            }`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
