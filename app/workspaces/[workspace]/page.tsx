'use client';

import { useEffect, useState } from 'react';
import { HiMiniPlus } from 'react-icons/hi2';

const Workspace = () => {
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    console.log(color);
  }, [color]);
  return (
    <div className='flex h-full flex-col p-3 gap-10'>
      <div className='flex gap-2 items-center'>
        <div className='text-2xl font-semibold'>Workspace name</div>
        <button>
          <HiMiniPlus />
        </button>
      </div>
      <input
        type='color'
        name=''
        id=''
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className='w-10 h-10 rounded-md rounded-'
      />
      <div className='flex gap-5  w-full h-full'>
        <div className='w-[400px] bg-orange-100 rounded-md p-3 flex flex-col gap-3'>
          <div>Title</div>
          <div className='flex flex-col gap-3'>
            <div className='rounded-md border text-card-foreground shadow h-28 bg-white p-3 cursor-pointer'>
              <h1 className='text-lg font-semibold'>Card title</h1>
            </div>
            <div className='rounded-md border text-card-foreground shadow h-28 bg-white p-3 cursor-pointer'>
              <h1 className='text-lg font-semibold'>Card title</h1>
            </div>
            <div className='rounded-md border text-card-foreground shadow h-28 bg-white p-3 cursor-pointer'>
              <h1 className='text-lg font-semibold'>Card title</h1>
            </div>
            <div className='rounded-md border text-card-foreground shadow h-28 bg-white p-3 cursor-pointer'>
              <h1 className='text-lg font-semibold'>Card title</h1>
            </div>
          </div>
        </div>
        <div className='w-[400px] bg-green-100 rounded-md p-3 flex flex-col gap-3'>
          <div>Title</div>
          <div className='flex flex-col gap-3'>
            <div className='rounded-md border text-card-foreground shadow h-28 bg-green-500 p-3 cursor-pointer'>
              <h1 className='text-lg font-semibold'>Card title</h1>
            </div>
            <div className='rounded-md border text-card-foreground shadow h-28 bg-white p-3 cursor-pointer'>
              <h1 className='text-lg font-semibold'>Card title</h1>
            </div>
            <div className='rounded-md border text-card-foreground shadow h-28 bg-white p-3 cursor-pointer'>
              <h1 className='text-lg font-semibold'>Card title</h1>
            </div>
            <div className='rounded-md border text-card-foreground shadow h-28 bg-white p-3 cursor-pointer'>
              <h1 className='text-lg font-semibold'>Card title</h1>
            </div>
          </div>
        </div>
        <div className='w-[400px] bg-purple-100 rounded-md p-3 flex flex-col gap-3'>
          <div>Title</div>
          <div className='flex flex-col gap-3'>
            <div className='rounded-md border text-card-foreground shadow h-28 bg-white p-3 cursor-pointer'>
              <h1 className='text-lg font-semibold'>Card title</h1>
            </div>
            <div className='rounded-md border text-card-foreground shadow h-28 bg-white p-3 cursor-pointer'>
              <h1 className='text-lg font-semibold'>Card title</h1>
            </div>
            <div className='rounded-md border text-card-foreground shadow h-28 bg-white p-3 cursor-pointer'>
              <h1 className='text-lg font-semibold'>Card title</h1>
            </div>
            <div className='rounded-md border text-card-foreground shadow h-28 bg-white p-3 cursor-pointer'>
              <h1 className='text-lg font-semibold'>Card title</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
