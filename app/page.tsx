import Image from 'next/image';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { PrimeReactProvider } from 'primereact/api';
import './globals.css'

export default function Home() {
  return (
    <div>
      <Button label='Click me' className='h-10'></Button>
    </div>
  );
}
