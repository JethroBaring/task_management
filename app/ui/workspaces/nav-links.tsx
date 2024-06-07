'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiMiniPlus } from 'react-icons/hi2';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NavLinks({ workspaces }: { workspaces: any }) {
  const router = useRouter();
  const [links, setLinks] = useState(workspaces);
  const [visible, setVisible] = useState<boolean>(false);
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const parentContainerRef = useRef<HTMLFormElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname().split('/')[2];

  useEffect(() => {
    inputRef.current?.focus();
  }, [visible]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current?.contains(event.target as Node) &&
        !addButtonRef.current?.contains(event.target as Node) &&
        !parentContainerRef.current?.contains(event.target as Node)
      ) {
        setVisible(false);
        setWorkspaceName('');
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/v1/workspace/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: workspaceName,
        creatorId: 1,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href=`/workspaces/${data.id}`
      // setLinks((prevLinks: any) => [
      //   ...prevLinks,
      //   { name: `${workspaceName}`, href: `/workspaces/${data.id}` },
      // ]);
      // setWorkspaceName('');
      // setVisible(false);
      // router.push(`/workspaces/${data.id}`);
    } else {
      console.log(response);
    }
  };

  return (
    <div className='bg-slate-100 p-2 flex flex-col gap-2 rounded-md h-full'>
      <div
        className={clsx(
          'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3'
        )}
      >
        <div className='flex justify-between items-center w-full'>
          <p className='hidden md:block'>Workspaces </p>
          <button
            onClick={() => {
              setVisible(!visible);
            }}
            ref={addButtonRef}
          >
            <HiMiniPlus />
          </button>
        </div>
      </div>
      {visible ? (
        <form
          ref={parentContainerRef}
          onSubmit={handleSubmit}
          className={clsx(
            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3'
          )}
        >
          <input
            ref={inputRef}
            type='text'
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className='bg-white focus:outline-none'
          />
        </form>
      ) : (
        ''
      )}
      {links.map((link: any) => {
        return (
          <Link
            key={`${link.id}`}
            href={`/workspaces/${link.id}`}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gradient-to-r from-blue-600 to-violet-600 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gradient-to-r from-blue-600 to-violet-600 text-white':
                  pathname == link.id,
              }
            )}
          >
            <div className='flex items-center justify-between w-full'>
              <p className='hidden md:block'>{link.name}</p>
              <p>+</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
