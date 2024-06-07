import React, { useEffect, useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { HiCheck, HiOutlinePencilSquare, HiTrash } from 'react-icons/hi2';
import { ConfirmDialog } from 'primereact/confirmdialog';

type Props = {
  task: any;
  index: number;
  provided: any;
  newTitle: any;
  setNewTitle: any;
  newDescription: any;
  setNewDescription: any;
  submitTask: any;
  id: number;
  deleteTask: any;
  updateTitle: any;
  updateDescription: any;
  setUpdateTitle: any;
  setUpdateDescription: any;
  updateId: any;
  setUpdateId: any;
  updateTask: any;
  newTaskInputRef: any
  newTaskFormRef: any
};

const TaskCard: React.FC<Props> = ({
  task,
  index,
  provided,
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
  submitTask,
  id,
  deleteTask,
  updateTitle,
  updateDescription,
  setUpdateTitle,
  setUpdateDescription,
  updateId,
  setUpdateId,
  updateTask,
  newTaskFormRef,
  newTaskInputRef
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [dialog, setDialog] = useState<boolean>(false);

  return (
    <>
      {task.id === 9999 ? (
        <form
          ref={newTaskFormRef}
          onSubmit={(e) => submitTask(e, id)}
          className='rounded-md hover:shadow-violet-500 hover:border text-card-foreground  h-28 bg-white p-3 cursor-pointer flex flex-col gap-2 justify-between'
        >
          <input
            className='text-lg font-semibold outline-none'
            placeholder='title'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            ref={newTaskInputRef}
          />
          <input
            className='text-sm outline-none'
            placeholder='description'
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <div className='h-10'></div>
          <button type='submit' className='hidden'>
            submit
          </button>
        </form>
      ) : task.id === updateId ? (
        <form
          onSubmit={(e) => updateTask(e, task.id, id)}
          className='rounded-md hover:shadow-violet-500 hover:border text-card-foreground  h-28 bg-white p-3 cursor-pointer flex flex-col gap-2 justify-between'
        >
          <input
            className='text-lg font-semibold outline-none'
            placeholder='title'
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <input
            className='text-sm outline-none'
            placeholder='description'
            value={updateDescription}
            onChange={(e) => setUpdateDescription(e.target.value)}
          />
          <div className='h-10 flex justify-end'>
            <button type='submit'>
              <HiCheck />
            </button>
          </div>
        </form>
      ) : (
        <Draggable key={`${task.id}`} draggableId={`${task.id}`} index={index}>
          {(provided, snapshot) => (
            <div
              className='rounded-md hover:shadow-violet-500 hover:border text-card-foreground  h-28 bg-white p-3 cursor-pointer flex flex-col gap-2 justify-between'
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
                opacity: snapshot.isDragging ? '0.5' : '1',
              }}
              onMouseOver={() => setVisible(true)}
              onMouseLeave={() => setVisible(false)}
            >
              <h1 className='text-lg font-semibold '>{task.title}</h1>
              <p className='text-sm'>{task.description}</p>
              <div className='h-10'>
                {visible ? (
                  <div className='flex justify-end gap-2'>
                    <button
                      onClick={() => {
                        setUpdateId(task.id);
                        setUpdateTitle(task.title); // Set updateTitle to current task title
                        setUpdateDescription(task.description);
                      }}
                    >
                      <HiOutlinePencilSquare />
                    </button>
                    <button onClick={() => setDialog(true)}>
                      <HiTrash />
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <ConfirmDialog
                visible={dialog}
                onHide={() => setDialog(false)}
                message='Are you sure you want to proceed?'
                header='Confirmation'
                icon='pi pi-exclamation-triangle'
                accept={() => deleteTask(task.id, id)}
                reject={() => setDialog(false)}
                acceptClassName='h-10 bg-red-500 border-none'
                rejectClassName='bg-white h-10 text-violet-500 border-none'
              />
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

export default TaskCard;
