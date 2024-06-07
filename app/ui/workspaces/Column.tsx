import React, { useState } from 'react';
import { HiMiniTrash } from 'react-icons/hi2';
import TaskCard from './Card';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method

type Props = {
  column: any;
  provided: any;
  name: string;
  deleteColumn: any;
};

const Column: React.FC<Props> = ({ column, provided, name, deleteColumn }) => {
  const [columnHover, setColumnHover] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      className='w-[400px] h-full rounded-md p-3 flex flex-col gap-3 bg-slate-100'
      onMouseOver={() => setColumnHover(true)}
      onMouseLeave={() => setColumnHover(false)}
    >
      <div className='flex items-center justify-between'>
        <div>{name}</div>
        {columnHover ? (
          <button onClick={() => setVisible(true)}>
            <HiMiniTrash />
          </button>
        ) : (
          ''
        )}
      </div>
      <div className='flex flex-col gap-3'>
        {column.tasks.map((task: any, index: any) => (
          <TaskCard task={task} index={index} provided={provided} key={index} />
        ))}
        {provided.placeholder}
      </div>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message='Are you sure you want to proceed?'
        header='Confirmation'
        icon='pi pi-exclamation-triangle'
        accept={() => deleteColumn(column.id)}
        reject={() => setVisible(true)}
        acceptClassName='h-10 bg-red-500 border-none'
        rejectClassName='bg-white h-10 text-violet-500 border-none'
      />
    </div>
  );
};

export default Column;
