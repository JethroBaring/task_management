import React, { useState } from 'react';
import { HiMiniPaintBrush } from 'react-icons/hi2';
import TaskCard from './Card';

type Props = {
  tasks: any[];
  provided: any;
  name: string
};

const Column: React.FC<Props> = ({ tasks, provided, name }) => {
  const [color, setColor] = useState<string>('#F0F0F0');
  const [columnHover, setColumnHover] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      className='w-[400px] rounded-md p-3 flex flex-col gap-3 bg-slate-100'
      // style={{ backgroundColor: color }}
      onMouseOver={() =>
        setColumnHover((prevColumnHover) => {
          const updatedColumnHover = [...prevColumnHover];
          updatedColumnHover[0] = true;
          return updatedColumnHover;
        })
      }
      onMouseLeave={() =>
        setColumnHover((prevColumnHover) => {
          const updatedColumnHover = [...prevColumnHover];
          updatedColumnHover[0] = false;
          return updatedColumnHover;
        })
      }
    >
      <div className='flex items-center justify-between'>
        <div>{name}</div>
        {columnHover[0] ? (
          <button>
            <label htmlFor='test'>
              <HiMiniPaintBrush />
            </label>
          </button>
        ) : (
          ''
        )}
        <input
          type='color'
          name='test'
          id='test'
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className='w-10 h-10 rounded-md hidden'
        />
      </div>
      <div className='flex flex-col gap-3'>
        {tasks.map((task, index) => (
          <TaskCard task={task} index={index} provided={provided} key={index} />
        ))}
        {provided.placeholder}
      </div>
    </div>
  );
};

export default Column;
