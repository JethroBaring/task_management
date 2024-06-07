import Image from 'next/image';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { PrimeReactProvider } from 'primereact/api';
import './globals.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex h-screen w-screen justify-center items-center'>
      <Link href="/login">
        <Button label='Login' className='h-10'></Button>
      </Link>
    </div>
  );
}
