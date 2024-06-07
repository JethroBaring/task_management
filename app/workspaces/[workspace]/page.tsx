'use client';

import { useEffect, useRef, useState } from 'react';
import { HiMiniPlus } from 'react-icons/hi2';
import Board from '@/app/ui/workspaces/Board';
import { usePathname } from 'next/navigation';

const Workspace = () => {
  const [color, setColor] = useState<string>('#F0F0F0');
  const [columnHover, setColumnHover] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [workspaceName, setWorkspaceName] = useState<string>('Workspace name');
  const [editWorkspaceName, setEditWorkspaceName] =
    useState<string>(workspaceName);
  const [edit, setEdit] = useState<boolean>(false);
  const [columns, setColumns] = useState<any[]>([]);
  const pathname = usePathname().split('/')[2];
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const getColumns = async () => {
      const response = await fetch(`http://localhost:3000/api/v1/column/2`);

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
      {columns.length > 0 ? <Board columnData={columns} /> : ''}
    </div>
  );
};

export default Workspace;
