'use client';

import Column from '@/app/ui/workspaces/Column';
import { useEffect, useRef, useState } from 'react';
import { HiMiniPlus } from 'react-icons/hi2';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Board from '@/app/ui/workspaces/Board';

const Workspace = () => {
  const [color, setColor] = useState<string>('#F0F0F0');
  const [columnHover, setColumnHover] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [workspaceName, setWorkspaceName] = useState<string>('Workspace name');
  const [editWorkspaceName, setEditWorkspaceName] = useState<string>(workspaceName);
  const [edit, setEdit] = useState<boolean>(false);
  const [columns, setColumns] = useState([
    {
      id: '1',
      title: ' 📃 To do',
      tasks: [
        { id: '11', title: 'Learn JavaScript' },
        { id: '12', title: 'Learn Git' },
        { id: '13', title: 'Learn Python' },
      ],
    },
    {
      id: '2',
      title: ' ✏️ In progress',
      tasks: [],
    },
    {
      id: '3',
      title: ' ✔️ Completed',
      tasks: [],
    },
  ]);
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        edit &&
        inputRef.current &&
        !inputRef.current?.contains(event.target as Node) &&
        !formRef.current?.contains(event.target as Node)
      ) {
        setEdit(false);
        setEditWorkspaceName(workspaceName);
        console.log('test');
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [edit, workspaceName]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  useEffect(() => {
    console.log(color);
  }, [color]);

  const onDragEnd = async (result: { destination: any; source?: any }) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = columns.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = columns.findIndex((e) => e.id === destination.droppableId);

      const sourceCol = columns[sourceColIndex];
      const destinationCol = columns[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      const updatedColumns = [...columns];
      updatedColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTask };
      updatedColumns[destinationColIndex] = { ...destinationCol, tasks: destinationTask };

      setColumns(updatedColumns);
    } else {
      const sourceColIndex = columns.findIndex((e) => e.id === source.droppableId);
      const sourceCol = columns[sourceColIndex];

      const tasks = [...sourceCol.tasks];
      const [removed] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, removed);

      const updatedColumns = [...columns];
      updatedColumns[sourceColIndex] = { ...sourceCol, tasks };

      setColumns(updatedColumns);
    }
  };

  return (
    <div className='flex h-full flex-col p-3 gap-10'>
      <div className='flex gap-2 items-center w-fit'>
        {edit ? (
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              setWorkspaceName(editWorkspaceName);
              setEdit(false);
            }}
          >
            <input
              ref={inputRef}
              type='text'
              className='text-2xl font-semibold w-auto outline-none'
              value={editWorkspaceName}
              onChange={(e) => setEditWorkspaceName(e.target.value)}
            />
          </form>
        ) : (
          <div
            ref={divRef}
            className='text-2xl font-semibold cursor-pointer'
            onClick={() => setEdit(!edit)}
          >
            {workspaceName}
          </div>
        )}
        <button>
          <HiMiniPlus />
        </button>
      </div>
      <Board />
      {/* <DragDropContext onDragEnd={onDragEnd}>
        <div className='flex gap-5  w-full h-full'>
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  className='w-[400px] rounded-md p-3 flex flex-col gap-3 bg-slate-100'
                  ref={provided.innerRef}
                >
                  <div>{column.title}</div>
                  <div className='flex flex-col gap-5'>
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              opacity: snapshot.isDragging ? '0.5' : '1',
                            }}
                          >
                            <div className='bg-blue-50'>
                              {task.title}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext> */}
    </div>
  );
};

export default Workspace;
