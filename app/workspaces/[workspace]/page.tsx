'use client';

import { useEffect, useRef, useState } from 'react';
import { HiMiniPlus } from 'react-icons/hi2';
import Board from '@/app/ui/workspaces/Board';
import { usePathname } from 'next/navigation';

const Workspace = () => {
  const [workspaceName, setWorkspaceName] = useState<string>('Workspace name');
  const [editWorkspaceName, setEditWorkspaceName] =
    useState<string>(workspaceName);
  const [edit, setEdit] = useState<boolean>(false);
  const [columns, setColumns] = useState<any[]>([]);
  const [columnName, setColumnName] = useState<string>('');
  const [create, setCreate] = useState<boolean>(false)
  const pathname = usePathname().split('/')[2];
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onDragEnd = async (result: { destination: any; source?: any }) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = columns.findIndex(
        (e: any) => e.id.toString() === source.droppableId
      );
      const destinationColIndex = columns.findIndex(
        (e: any) => e.id.toString() === destination.droppableId
      );

      const sourceCol = columns[sourceColIndex];
      const destinationCol = columns[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);

      destinationTask.splice(destination.index, 0, removed);
      columns[sourceColIndex].tasks = sourceTask;
      columns[destinationColIndex].tasks = destinationTask;

      setColumns(columns);
      let status = 'PENDING';
      if (columns[destinationColIndex].name.includes('In progress')) {
        status = 'IN_PROGRESS';
      } else if (columns[destinationColIndex].name.includes('Completed')) {
        status = 'COMPLETED';
      }
    } else {
      const sourceColIndex = columns.findIndex(
        (e: any) => e.id === source.droppableId
      );
      const sourceCol = columns[sourceColIndex];

      const [removed] = sourceCol.tasks.splice(source.index, 1);

      sourceCol.tasks.splice(destination.index, 0, removed);
      setColumns([...columns]);
    }
  };

  useEffect(() => {
    const getColumns = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/column/${pathname}`);

      const data = await response.json();

      if (response.ok) {
        setColumns(data);
        console.log(data);
      }
    };

    getColumns();
  }, [pathname]);

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
        <button onClick={() => {
          setCreate(true)
          setColumns([...columns, {
            id: 1,
            name: 'test',
            position: 1,
            workspaceId: 1,
            tasks: []
          }])
        }}>
          <HiMiniPlus />
        </button>
      </div>
      {columns.length > 0 ? (
        <Board columns={columns} onDragEnd={onDragEnd}/>
      ) : (
        <div className='flex justify-center items-center h-full w-full'>
          Start creating your column
        </div>
      )}
    </div>
  );
};

export default Workspace;
