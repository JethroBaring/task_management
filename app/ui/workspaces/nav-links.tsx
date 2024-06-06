'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiMiniPlus } from 'react-icons/hi2';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
export default function NavLinks() {
  const [links, setLinks] = useState([
    { name: 'Home', href: '/dashboard' },
    {
      name: 'Invoices',
      href: '/dashboard/invoices',
    },
    { name: 'Customers', href: '/dashboard/customers' },
  ]);
  const [visible, setVisible] = useState<boolean>(false);
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const parentContainerRef = useRef<HTMLFormElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    inputRef.current?.focus();
  }, [visible]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current?.contains(event.target) &&
        !addButtonRef.current?.contains(event.target) &&
        !parentContainerRef.current?.contains(event.target)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLinks((prevLinks) => [
      ...prevLinks,
      { name: `${workspaceName}`, href: `/dashboard/${workspaceName}` },
    ]);
    setWorkspaceName('');
    setVisible(false);
  };

  return (
    <div className='bg-slate-100 p-2 flex flex-col gap-2 rounded-md h-full'>
      <div
        className={clsx(
          'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3'
        )}
      >
        <div className='flex justify-between items-center w-full'>
          <p className='hidden md:block'>Workspaces</p>
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
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gradient-to-r from-blue-600 to-violet-600 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gradient-to-r from-blue-600 to-violet-600 text-white':
                  pathname === link.href,
              }
            )}
          >
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
