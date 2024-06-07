import React, { useState } from 'react';
import { HiMiniPlus, HiMiniPlusSmall, HiMiniTrash } from 'react-icons/hi2';
import TaskCard from './TaskCard';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component

type Props = {
  column: any;
  provided: any;
  name: string;
  deleteColumn: any;
  addTask: any;
  newTitle: any;
  setNewTitle: any;
  newDescription: any;
  setNewDescription: any;
  submitTask: any;
  deleteTask: any;
  updateTitle: any;
  updateDescription: any;
  setUpdateTitle: any;
  setUpdateDescription: any;
  updateId: any;
  setUpdateId: any;
  updateTask: any;
  newTaskInputRef: any;
  newTaskFormRef: any;
};

const Column: React.FC<Props> = ({
  column,
  provided,
  name,
  deleteColumn,
  addTask,
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
  submitTask,
  deleteTask,
  updateTitle,
  updateDescription,
  setUpdateTitle,
  setUpdateDescription,
  updateId,
  setUpdateId,
  updateTask,
  newTaskFormRef,
  newTaskInputRef,
}) => {
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
        <div className='flex gap-1 items-center'>
          <div>{name}</div>
          {columnHover ? (
            <button onClick={() => addTask(column.id)}>
              <HiMiniPlus />
            </button>
          ) : (
            ''
          )}
        </div>
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
          <TaskCard
            task={task}
            index={index}
            provided={provided}
            key={index}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newDescription={newDescription}
            setNewDescription={setNewDescription}
            submitTask={submitTask}
            id={column.id}
            deleteTask={deleteTask}
            updateTitle={updateTitle}
            setUpdateTitle={setUpdateTitle}
            updateDescription={updateDescription}
            setUpdateDescription={setUpdateDescription}
            updateId={updateId}
            setUpdateId={setUpdateId}
            updateTask={updateTask}
            newTaskInputRef={newTaskInputRef}
            newTaskFormRef={newTaskFormRef}
          />
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
