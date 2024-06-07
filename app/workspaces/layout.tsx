import SideNav from '@/app/ui/workspaces/sidenav';
import getUser from '../lib/session';
import { redirect } from 'next/navigation';

async function getData() {
  const res = await fetch('http://localhost:3000/api/v1/workspace/1', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const workspaces = await getData();

  const user = (await getUser()) as {
    user?: { id: number; email: string; firstName: string; lastName: string };
  };

  if(!user) {
    redirect('/login')
  }

  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
      <div className='w-full flex-none md:w-64'>
        <SideNav user={user} workspaces={workspaces} />
      </div>
      <div className='flex-grow px-3 py-4 md:px-2 md:overflow-y-auto '>
        {children}
      </div>
    </div>
  );
}
