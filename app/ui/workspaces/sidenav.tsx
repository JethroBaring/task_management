import Link from 'next/link';
import NavLinks from './nav-links';
import { HiArrowLeftStartOnRectangle } from 'react-icons/hi2';
import { redirect } from 'next/navigation';
import { logout } from '@/app/lib/session';

export default function SideNav({
  user,
  workspaces,
}: {
  user: any;
  workspaces: any;
}) {
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
      <Link
        className='mb-2 flex h-20 items-end justify-start rounded-md bg-gradient-to-r from-blue-600 to-violet-600 p-4 md:h-40'
        href='/'
      >
        <div className='w-32 text-white md:w-40 flex flex-col'>
          <span className='text-xl font-semibold'>Hi,</span>
          <span className='text-5xl font-black'>{user?.firstName}</span>
        </div>
      </Link>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        {workspaces ? <NavLinks workspaces={workspaces} id={user.id} /> : ''}
        <form
          action={async () => {
            'use server';
            await logout();
            redirect('/login');
          }}
        >
          <button className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-slate-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'>
            <HiArrowLeftStartOnRectangle />
            <div className='hidden md:block'>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
