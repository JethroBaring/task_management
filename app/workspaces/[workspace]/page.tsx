'use client';

import { useEffect, useRef, useState } from 'react';
import { HiMiniPlus } from 'react-icons/hi2';
import Board from '@/app/ui/workspaces/Board';
import { usePathname } from 'next/navigation';
import { BASE_API_URL } from '@/app/lib/contants';

const Workspace = () => {
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [editWorkspaceName, setEditWorkspaceName] =
    useState<string>(workspaceName);
  const [edit, setEdit] = useState<boolean>(false);
  const [create, setCreate] = useState<boolean>(false);
  const [columns, setColumns] = useState<any[]>([]);
  const [columnName, setColumnName] = useState<string>('');
  const pathname = usePathname().split('/')[2];
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const columnFormRef = useRef<HTMLFormElement>(null);
  const columnInputRef = useRef<HTMLInputElement>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [updateTitle, setUpdateTitle] = useState<string>('');
  const [updateDescription, setUpdateDescription] = useState<string>('');
  const [updateId, setUpdateId] = useState<number>();

  const submitTask = async (e: React.FormEvent, statusId: number) => {
    e.preventDefault();
    console.log('wew');
    const columnIndex = columns.findIndex((column) => column.id === statusId);
    const response = await fetch(`${BASE_API_URL}/api/v1/task/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        status: 'todo',
        position: 1,
        creatorId: 2,
        columnId: statusId,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const updatedColumns = [...columns];
      updatedColumns[columnIndex].tasks = updatedColumns[
        columnIndex
      ].tasks.filter((task: any) => task.id !== 9999);
      updatedColumns[columnIndex].tasks.push(data);
      setNewTitle('');
      setNewDescription('');
      setColumns(updatedColumns);
    }
  };

  const addTask = async (statusId: number) => {
    const columnIndex = columns.findIndex((column) => column.id === statusId);
    const updatedColumns = [...columns];
    updatedColumns[columnIndex].tasks.push({
      id: 9999,
      title: 'Sample',
      description: 'description',
      status: 'todo',
      position: 4,
      columnId: 13,
    });

    setColumns(updatedColumns);
  };

  const deleteTask = async (id: number, statusId: number) => {
    const columnIndex = columns.findIndex((column) => column.id === statusId);
    const response = await fetch(`${BASE_API_URL}/api/v1/task/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      const updatedColumns = [...columns];
      updatedColumns[columnIndex].tasks = updatedColumns[
        columnIndex
      ].tasks.filter((task: any) => task.id !== id);
      setColumns(updatedColumns);
    }
  };

  const updateTaskStatus = async (id: number, statusId: number) => {
    const response = await fetch(`${BASE_API_URL}/api/v1/task/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        columnId: statusId,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }
  };

  const updateTask = async (e: React.FormEvent, id: number, statusId: number) => {
    e.preventDefault()
    const columnIndex = columns.findIndex((column) => column.id === statusId);
    const response = await fetch(`${BASE_API_URL}/api/v1/task/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title: updateTitle,
        description: updateDescription,
        columnId: statusId
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const updatedColumns = [...columns];
      const taskIndex = updatedColumns[columnIndex].tasks.findIndex(
        (task: any) => task.id === data.id
      );
      updatedColumns[columnIndex].tasks[taskIndex] = data;
      setUpdateTitle('');
      setUpdateDescription('');
      setUpdateId(-1111);
      setColumns(updatedColumns);
      return data;
    }
  };

  const addColumn = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${BASE_API_URL}/api/v1/column/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: columnName,
        position: 3,
        workspaceId: Number.parseInt(pathname),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const updatedColumn = columns.filter((column) => column.id !== 9999);
      updatedColumn.push(data);
      setColumnName('');
      setColumns(updatedColumn);
    }
  };

  const deleteColumn = async (id: number) => {
    const response = await fetch(`${BASE_API_URL}/api/v1/column/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      const updatedColumn = columns.filter((column) => column.id !== id);
      setColumns(updatedColumn);
    }
  };

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

      console.log(removed);
      console.log(destination.droppableId);
      destinationTask.splice(destination.index, 0, removed);
      columns[sourceColIndex].tasks = sourceTask;
      columns[destinationColIndex].tasks = destinationTask;

      const update = await updateTaskStatus(
        removed.id,
        destination.droppableId
      );

      if (update) {
        setColumns(columns);
      }
    } else {
      const sourceColIndex = columns.findIndex(
        (e: any) => e.id.toString() === source.droppableId
      );
      const sourceCol = columns[sourceColIndex];

      const [removed] = sourceCol.tasks.splice(source.index, 1);

      sourceCol.tasks.splice(destination.index, 0, removed);
      setColumns([...columns]);
    }
  };

  useEffect(() => {
    const getColumns = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/column/${pathname}`
      );

      const data = await response.json();

      if (response.ok) {
        setColumns(data);
        console.log(data);
      }
    };

    const getWorkspace = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/workspace/single/${pathname}`
      );

      const data = await response.json();

      if (response.ok) {
        setWorkspaceName(data.name);
      }
    };

    getColumns();
    getWorkspace();
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

  useEffect(() => {
    columnInputRef.current?.focus();
  }, [create]);

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
        <button
          onClick={() => {
            setCreate(!create);
            setColumns([
              ...columns,
              {
                id: 9999,
                name: 'test',
                position: 1,
                workspaceId: 1,
                tasks: [],
              },
            ]);
          }}
        >
          <HiMiniPlus />
        </button>
      </div>
      {columns.length > 0 ? (
        <Board
          columns={columns}
          onDragEnd={onDragEnd}
          columnName={columnName}
          setColumnName={setColumnName}
          addColumn={addColumn}
          columnFormRef={columnFormRef}
          columnInputRef={columnInputRef}
          deleteColumn={deleteColumn}
          addTask={addTask}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          submitTask={submitTask}
          deleteTask={deleteTask}
          updateTitle={updateTitle}
          setUpdateTitle={setUpdateTitle}
          updateDescription={updateDescription}
          setUpdateDescription={setUpdateDescription}
          updateId={updateId}
          setUpdateId={setUpdateId}
          updateTask={updateTask}
        />
      ) : (
        <div className='flex justify-center items-center h-full w-full'>
          Start creating your column
        </div>
      )}
    </div>
  );
};

export default Workspace;
